                                                           MADZI-WATCHER 
```
Real-Time Water monitoring platform, a system which solves the problem of manual water quality testing parameters
It is IoT-based powered system--capable of monitoring water quality parameters 24 hours..
```
BUSINESS CASE
```
	Title: Madzi-Watcher-- Real-Time water monitoring platform
	Problem: People in Malawi drink unsafe wate due to manual detection of water quality parameters
	Solution: To mitigate this problem, Madzi-watcher project come in where ESP32-based sensors are being used
						to measure water ph, turbidity, TDS(Total Dissolved Solutes), and Electrical conductivity and send 
						data to dashboard for analysis, Water monitors are notified on violation in real-time, no delays

	Benefits: Early detection of pollution, data driven decision and minimizises downtime and damage
	Expected cost: MWK185,000 to buy all materials(esp32,tsd,ph,turbidity and ec sensors).
	Expected Returns: improved public health
	Risks:		Sensor damage, network issues and low adoption.


```

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
|--- Configurations
```
WEB BACKEND URLS
```
AuthenticationController

https://madzi-watcher-backend.onrender.com/api/auth/login
Method: POST
--to login user is expected to hit this point

https://madzi-watcher-backend.onrender.com/api/auth/otp
method: POST
--to be logged in user need to verify this identity using OTP


https://madzi-watcher-backend.onrender.com/api/auth/register
method: POST
--Admin is going to hit this endpoint to register new water monitor



https://madzi-watcher-backend.onrender.com/api/auth/request-reset
method: POST
--if the user want to request for password change has to hit this endpoint

https://madzi-watcher-backend.onrender.com/api/auth/refresh-token
method: POST
--ensures user is logged in and checks if session still exists

/api/auth/logout
method: POST
--enables user to sign out

https://madzi-watcher-backend.onrender.com/api/auth/reset-password
method: POST
--enable user reset password

https://madzi-watcher-backend.onrender.com/api/auth/request-reset
method: POST
--it validates if the email requesting for password change is valid

https://madzi-watcher-backend.onrender.com/api/auth/change-password
method: POST
--it allows validated user to change password

```
WATER MONITOR CONTROLLER URLS
```
https://madzi-watcher-backend.onrender.com/api/water-monitor/
method: GET
--used by Admins only to get all users

https://madzi-watcher-backend.onrender.com/api/water-monitor/me/profile
method: GET
--used get logged in users profile

https://madzi-watcher-backend.onrender.com/api/water-monitor/:id
method: GET
--used by admins to get user by his/her ID

https://madzi-watcher-backend.onrender.com/api/water-monitor/:id
method: DELETE
--used by admins only to delete user 

https://madzi-watcher-backend.onrender.com/api/water-monitor/me/profile
method: PATCH
-- used by logged in user to update profile

https://madzi-watcher-backend.onrender.com/api/water-monitor/:id/promote
method: PATCH
--used by admins to change position of user to either admin or superadmin

```
NOTIFICATIONS CONTROLLER URLS

```
https://madzi-watcher-backend.onrender.com/api/notifications/
method: POST
--allows creation of notification by the system

https://madzi-watcher-backend.onrender.com/api/notifications/:id/read
method: PATCH
--marks notifications as read

https://madzi-watcher-backend.onrender.com/api/notification/:id
method: DELETE
-- deletes notification
```
WATER QUALITY CONTROLLER URLS

```
https://madzi-watcher-backend.onrender.com/api/water-quality/stats/dashboard
method: GET
--used fetches data for dashboard viewing including average of water paremeters, graphs of WQI and tables

https://madzi-watcher-backend.onrender.com/api/water-quality/stats/mean
method: GET
--used to  get average on the WQI, value on which WQI tends to cling to

https://madzi-watcher-backend.onrender.com/api/water-quality/stats/daily
method: GET
--used to get water qaulity index (WQI) based on the day(per hour)

https://madzi-watcher-backend.onrender.com/api/water-quality/stats/weekly
method: GET
--used to get water qaulity index (WQI) based on the week (monday, Tuesday...)

https://madzi-watcher-backend.onrender.com/api/water-quality/stats/monthly
method: GET
--used to get water qaulity index (WQI) based on the month(January, February...)

/api/water-quality/stats/:treatment-plant/treatment-plant
method: GET
--used to get Water quality index (WQI) from treatment plant

https://madzi-watcher-backend.onrender.com/api/water-quality/stats/trends
method: GET
--used in proting graphs

https://madzi-watcher-backend.onrender.com/api/water-quality/stats/trend-line
method: GET
--used to differenciate x and y axis

