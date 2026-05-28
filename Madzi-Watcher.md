                                                           MADZI-WATCHER 

Real-Time Water monitoring platform, a system which solves the problem of manual water quality testing parameters
It is IoT-based powered system--capable of monitoring water quality parameters 24 hours..

CONTRIBUTORS

```
Light Bekete
|--- StatisticsFeature both backend & frondend
|--- Architectual Design of (Backend, frondend and CircuitCode)


Bryan Nathupo
|--- AutheticationFeature both backend & frontend
|--- Simulation
|--- Actuators in circuit Design backend

Grace Mphande
|--- statisticsFeature both backend and frontEnd
|--- statusOfLED circuit Design backend

Terrence Kabango
|--- UserProfile both backend and frontend
|
```
WEB BACKEND URLS
```
AuthenticationController

/api/auth/login
Method: POST

expected request-body
{
	"email": "superadmin@madzi.com"
	"password": "superadminpassword"
}
expected response-body
{
	"status": "success"
	"message": {object of tokens}
	"otpCode": ""
	"sessionId":
	"user": {object}
}

/api/auth/otp
method: POST

expected request-body
{
	"email": "superadmin@madzi.com"
	"otp": ""
}

expected response-body
{
	"status": "success"
	"message": "OTP verified successfully.You can log in now."
}

/api/auth/register
method: POST

expected request-body
{
  "email": "bryan@madzi.com",
  "role": "water_monitor",
  "location": {
    "assignedArea": "Chirunga",
    "district": "Zomba"
  },
  "verificationSessionId": "69aee51a6afd69aa40057699"
}

expected response-body
{
	"status": "success"
	"message": "Water monitor registered successfully"
}

/api/auth/request-reset
method: POST

expected request-body
{
	"email": "bryan@madzi.com"
}

expected response-body
{
	"status": "success"
	"message": "Password reset OTP sent to bryan@madzi.com"
}

/api/auth/refresh-token
method: POST
--ensures that user is logged for a period of time

/api/auth/logout
method: POST
--enables user to sign out

/api/auth/reset-password
method: POST
expected request-body
{
  "email": "bryan@madzi.com",
  "newPassword": "1234",
  "confirmNewPassword": "1234"
}
expected response-body
{
	"status": "success",
    "message": "Password reset successful. You can now log in with your new password.
}

/api/auth/request-reset
method: POST
--it validates if the email requesting for password change is valid

/api/auth/change-password
method: POST
--it allows validated user to change password

```
WATER MONITOR CONTROLLER URLS
```
/api/water-monitor/
method: GET
--used by Admins only to get all users

/api/water-monitor/me/profile
method: GET
--used get logged in users profile

/api/water-monitor/:id
method: GET
--used by admins to get user by his/her ID

/api/water-monitor/:id
method: DELETE
--used by admins only to delete user 

/api/water-monitor/me/profile
method: PATCH
-- used by logged in user to update profile

/api/water-monitor/:id/promote
method: PATCH
--used by admins to change position of user to either admin or superadmin

