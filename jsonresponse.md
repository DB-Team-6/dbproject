
# /api/addemployee
Send post req
```
{
	"firstName":"Test1",
    "lastName":"Test1",
    "email":"Test1@Test1.com",
    "phone":"Test1",
    "passwd":"Test1",
    "mngID":1
}
```
Receive
`Employee added...`


# /api/getemployee
Send get req

Receive
```
[
    {
        "firstName": "Manager",
        "lastName": "Fiirst",
        "email": "manager@yahoo.com",
        "phone": "123456789",
        "passwd": "password",
        "mngID": 1,
        "empID": 1
    },
    {
        "firstName": "Test1",
        "lastName": "Test1",
        "email": "Test1@Test1.com",
        "phone": "Test1",
        "passwd": "Test1",
        "mngID": 1,
        "empID": 2
    }
]
```

# /api/getemployee/1
Send get req

Receive
```
[
    {
        "firstName": "Manager",
        "lastName": "Fiirst",
        "email": "manager@yahoo.com",
        "phone": "123456789",
        "passwd": "password",
        "mngID": 1,
        "empID": 1
    }
]
```

# /api/employeeupdate
Send post req

```
{
	"firstName":"Test",
    "lastName":"Test",
    "email":"Test1@Test.com",
    "phone":"Test",
    "passwd":"Test",
    "mngID":1,
    "empID":1
}
```
Receive
`Employee updated...`