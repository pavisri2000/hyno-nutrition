This document shows how to deploy the Hyno Nutrition app to a server using Docker and Docker Compose.

Prerequisites (on the target server)
- Docker installed
- Docker Compose (v2 recommended) or docker-compose
- Open ports: 80 (frontend), 8080 (backend), 3306 (optional MySQL, or keep it internal)

Quick deploy (recommended for a single server)
1. Clone this repo on the server:
   git clone <your-repo> && cd hyno-nutrition-app

2. Build and start (from repo root):

   # Build images and start services in detached mode
   docker compose up --build -d

3. Check logs:
   docker compose logs -f backend
   docker compose logs -f frontend

4. Verify:
- Frontend: http://<server-ip>:3000 (serves the built React app)
- Backend: http://<server-ip>:8080 (Spring Boot API)

Notes and environment customization
- Database: The provided docker-compose includes a MySQL service for convenience.
  For production you may want an external managed DB. Update the `SPRING_DATASOURCE_*` envs in `docker-compose.yml` accordingly.
- Secrets: Do NOT store production secrets in the compose file. Use environment files, Docker secrets, or an orchestration platform.
- Ports: The compose maps frontend to host port 3000 -> container port 80. You can change host mapping to 80 if you want public frontend on port 80.

Running as systemd service
- Create a systemd unit that runs `docker compose -f /path/to/hyno-nutrition-app/docker-compose.yml up -d` at boot.
- Or use Docker's restart policies and enable docker.service.

Scaling and production
- For production consider container registry (build images in CI, push to registry) and deploy to an orchestrator (Kubernetes, ECS, Azure Container Apps, etc.).
- Add healthchecks and readiness checks to services and handle migrations and backups for the DB.

Troubleshooting
- Container won't start: `docker compose ps` and `docker compose logs <service>`
- DB connection errors: ensure the DB has finished initializing before backend attempts to connect. `depends_on` only controls start order, not readiness.

Next steps (optional)
- Add a `health` endpoint and configure compose healthchecks.
- Add an `.env` file and document variables in `.env.example`.
- Add a CI workflow to build and push images to a registry.

Run at boot with systemd
--
Below is an example `systemd` unit you can use on a Linux server to start the application on boot using Docker Compose. Adjust paths and the user to match your setup.

Create the unit file `/etc/systemd/system/hyno-nutrition-app.service` with:

```
[Unit]
Description=Hyno Nutrition Docker Compose
After=docker.service

[Service]
Type=oneshot
WorkingDirectory=/path/to/hyno-nutrition-app
RemainAfterExit=yes
ExecStart=/usr/bin/docker compose up -d --build
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=600
User=root

[Install]
WantedBy=multi-user.target
```

Reload systemd and enable the service:

```
sudo systemctl daemon-reload
sudo systemctl enable hyno-nutrition-app.service
sudo systemctl start hyno-nutrition-app.service
```

Notes:
- Prefer running Docker Compose under a dedicated user instead of `root` where possible. If using a non-root user, ensure that user is in the `docker` group and that the `WorkingDirectory` path is readable.
- Consider using a process supervisor or container orchestrator (Kubernetes, Nomad) for production workloads.
