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
AuthenticationFeature

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
