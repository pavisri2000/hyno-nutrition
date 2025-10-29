# TODO: Completely Remove Authentication from Hyno Nutrition App

## Information Gathered
- **Frontend**: Currently has AuthContext, authService, api.js with auth interceptors, AuthPage with registration, Login/Register components, protected routes in App.js.
- **Backend**: Has AuthController, AuthService, UserService, UserRepository, User model, JWT configs, LoginHistory, etc.
- **Goal**: Remove all authentication completely. App should open directly to the main application without login/register.

## Plan
1. **Frontend Cleanup**:
   - Delete Auth folder and all components (AuthPage.jsx, Login.jsx, Register.jsx)
   - Delete authService.js, api.js (remove auth interceptors)
   - Delete AuthContext.js
   - Update App.js: Remove AuthProvider, remove auth routes, make all routes public, remove ProtectedRoute wrapper

2. **Backend Cleanup**:
   - Delete AuthController.java
   - Delete AuthService.java
   - Delete UserService.java (if only for auth)
   - Delete UserRepository.java
   - Delete User.java model
   - Delete LoginHistory related files
   - Delete JWT related configs (JwtAuthenticationFilter.java, JwtUtil.java)
   - Update SecurityConfig.java to remove JWT auth
   - Remove auth-related DTOs (LoginRequest.java, RegisterRequest.java)

3. **Testing**:
   - Start frontend and backend
   - Verify app opens directly to dashboard without auth

## Dependent Files to be edited/deleted
- Frontend: Auth folder, authService.js, api.js, AuthContext.js, App.js
- Backend: AuthController.java, AuthService.java, UserService.java, UserRepository.java, User.java, LoginHistory.java, LoginHistoryRepository.java, LoginHistoryService.java, JwtAuthenticationFilter.java, JwtUtil.java, LoginRequest.java, RegisterRequest.java, SecurityConfig.java

## Followup steps
- Run the app and verify it works without authentication
- Remove any unused dependencies or imports
