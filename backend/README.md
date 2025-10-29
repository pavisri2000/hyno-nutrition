# Hyno Nutrition API

A comprehensive nutrition and wellness API built with Spring Boot, providing personalized meal planning, recipe management, health tracking, and disease-specific dietary guidance.

## Features

- User authentication and authorization with JWT
- Personalized meal plan generation based on health goals
- Extensive recipe database with South Asian cuisine focus
- Disease-specific dietary recommendations
- Health tracking (weight, water intake, meals)
- BMI calculation and monitoring
- Favorite recipes management
- Symptom checker integration

## Prerequisites

- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE hyno_nutrition_db;
```

2. Update the database credentials in `src/main/resources/application.properties` if needed (default: root user with no password).

## Installation and Running

1. Clone the repository and navigate to the backend directory:
```bash
cd hyno-nutrition-app/backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users` - Delete user account

### Recipes
- `GET /api/recipes` - Get all recipes (with filtering)
- `GET /api/recipes/{id}` - Get recipe by ID
- `GET /api/recipes/search` - Search recipes
- `GET /api/recipes/by-disease/{diseaseId}` - Get recipes for specific disease

### Diseases
- `GET /api/diseases` - Get all diseases
- `GET /api/diseases/{id}` - Get disease by ID
- `GET /api/diseases/search` - Search diseases

### Meal Plans
- `POST /api/meal-plans/generate` - Generate meal plan
- `GET /api/meal-plans` - Get user's meal plans
- `GET /api/meal-plans/{id}` - Get meal plan by ID
- `DELETE /api/meal-plans/{id}` - Delete meal plan

### Tracking
- `POST /api/tracking/meal` - Log meal
- `POST /api/tracking/water` - Log water intake
- `POST /api/tracking/weight` - Log weight
- `GET /api/tracking/daily/{date}` - Get daily tracking data
- `GET /api/tracking/history` - Get tracking history

### Favorites
- `POST /api/favorites/{recipeId}` - Add recipe to favorites
- `DELETE /api/favorites/{recipeId}` - Remove recipe from favorites
- `GET /api/favorites` - Get user's favorite recipes

## Sample API Calls

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "dateOfBirth": "1990-01-01",
    "gender": "Male",
    "height": 175.0,
    "weight": 70.0,
    "healthGoal": "WEIGHT_LOSS"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Recipes
```bash
curl -X GET "http://localhost:8080/api/recipes?page=0&size=10&mealType=breakfast" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Generate Meal Plan
```bash
curl -X POST http://localhost:8080/api/meal-plans/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "goal": "WEIGHT_LOSS",
    "duration": 7
  }'
```

## Data Model

The application includes the following main entities:
- **User**: User profiles with health information
- **Recipe**: Detailed recipes with nutritional information
- **Disease**: Health conditions with dietary guidelines
- **MealPlan**: Personalized meal plans
- **DailyMeal**: Individual day meal breakdowns
- **MealLog**: Meal consumption tracking
- **WaterLog**: Water intake tracking
- **WeightLog**: Weight tracking over time
- **Favorite**: User's favorite recipes

## Security

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration for frontend integration
- Role-based access control

## Development

### Running Tests
```bash
mvn test
```

### Code Formatting
The project uses standard Spring Boot conventions and Lombok for reducing boilerplate code.

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify database credentials in `application.properties`
- Check if the database exists

### Port Already in Use
- Change the port in `application.properties`: `server.port=8081`

### JWT Token Issues
- Check the JWT secret key in `application.properties`
- Ensure tokens are not expired (default: 24 hours)

### CORS Issues
- Verify CORS configuration in `CorsConfig.java`
- Ensure frontend is running on the allowed origin

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
