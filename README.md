# Egg Talk

<b>Temporary Server URL</b> `https://egg-talk-server.run.goorm.io`  

---


**User Controller **`/users/**`  
- [회원가입](#회원가입)  
- [로그인](#로그인)  
- [유저 정보 불러오기](#현재-유저-정보-불러오기)  
- [유저 정보 수정하기](#유저-정보-수정하기)  
- [유저 채팅방 목록 가져오기](#유저-채팅방-목록-가져오기)

`/rooms/**`  
- [채팅방 생성하기](#채팅방-생성하기)
- [모든 채팅방 목록 가져오기](#모든-채팅방-목록-가져오기)
- [채팅방 내의 메세지 가져오기](#채팅방-내의-메세지-가져오기)

---

### 회원가입 
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/users` | `False` |

- 아이디, 비밀번호, 이름으로 간단한 회원가입 가능.  
- 비밀번호는 영문자, 숫자를 각각 포함한 8~20자의 문자열이어야 함.  


#### Request body
```bash
{
    "userId": user_id,
    "password": user_password,
    "username": user_name,
    "gender": user_gender,
    "email: user_email
}
```
#### Response body

```javascript
{
    "userId": user_id,
    "username": user_name,
    "gender": user_gender,
    "email": user_email
    "authorityDtoSet": [
        {
            "authorityName": user_authority //유저의 권한 (ADMIN_USER: 관리자, ROLE_USER: 일반 유저)
        }
    ]
}
```
---

### 로그인

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/auth` | `True` |

- 아이디와 비밀번호를 통해 토큰을 발급받음.

#### Request body
```javascript
{
    "userId": user_id,
    "password": user_password,
}
```

#### Response body
```javascript
{
    "token": token_value
}
```
---

### 현재 유저 정보 불러오기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/auth/me` | `True` |

- 헤더에 토큰값을 추가해서 요청하면 서버에서는 토큰을 통해 사용자의 정보를 응답한다.
#### Requset header
```javascript
{
    ...
    "Authorization": token
}
```

#### Response body
```javascript
{
    "userId": user_id,
    "username": user_name,
    "gender": user_gender,
    "email": user_email
    "authorityDtoSet": [
        {
            "authorityName": user_authority //유저의 권한 (ADMIN_USER: 관리자, ROLE_USER: 일반 유저)
        }
    ]
}
```
---

### 특정 유저 정보 가져오기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/users/{userId}` | `True` |

- `userId`에 해당하는 유저의 정보를 가져온다.

#### URL

`.../users/test32`

#### Response body
```javascript
{
    "userId": "test32",
    "username": "master2",
    "gender": 0,
    "email": "test2@test.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```

--- 

### 유저 정보 수정하기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `PUT` | `/users/{userId}` | `True` |

- URL의 `userId`와 토큰의 `userId`가 일치하면 해당 아이디의 유저 정보를 수정함.
- 비밀번호, 유저이름, 이메일을 수정할 수 있다.


#### Requset body
```javascript
{
    "password": user_password,
    "username": user_name,
    "email": user_email
}
```

#### Response body
```javascript
{
    "userId": user_id,
    "username": updated_user_name,
    "gender": user_gender,
    "email": updated_user_email,
    "authorityDtoSet": [
        {
            "authorityName": user_authority //유저의 권한 (ADMIN_USER: 관리자, ROLE_USER: 일반 유저)
        }
    ]
}
```

---

### 모든 채팅방 목록 가져오기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms` | `True` |

- 모든 채팅방 목록을 가져옴

#### Request
```javascript
//생략  
```

#### Response body
```javascript
//test value
[
    ...
    {
        "createdDate": "2022-10-04T13:38:50",
        "roomId": 10,
        "creatorId": "test32",
        "roomName": "testterdf"
    },
    {
        "createdDate": "2022-10-04T13:53:51",
        "roomId": 11,
        "creatorId": "ckdhkdwns",
        "roomName": "My room!"
    }
    ...
]
```
---

### 유저 채팅방 목록 가져오기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/users/{userId}/rooms` | `True` |

- URL의 `userId`와 토큰의 `userId`가 일치하면 해당 아이디의 유저 정보를 가져옴.

### URL

`.../users/test32/rooms`

### Response Body 

```javascript
// 
[
    ...
    {
        "createdDate": "2022-10-04T13:38:50",
        "roomId": 10,
        "creatorId": "test32",
        "roomName": "testterdf"
    },
    ...
]
```

### 채팅방 생성하기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/rooms` | `True` |

- 채팅방을 생성한다.

#### Request body
```javascript
{
    "roomName" : "My room!"
}
```
#### Response body
```javascript
{
    "creatorId": "test32", // 토큰의 userId
    "roomName": "My room!", // request header의  roomName
}
```

---

### 채팅방 내의 메세지 가져오기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms/{roomId}/messages` | `True` |

- 방 아이디를 통해 채팅 메세지들을 불러온다.

#### URL
`.../rooms/6/messages`

#### Response body

```javascript
[
    ...
    {
        "createdDate": "2022-10-04T10:31:19",
        "id": 4,
        "messageType": 0,
        "roomId": 6,
        "sender": "testuser",
        "message": "testuser님이 입장하였습니다."
    },
    {
        "createdDate": "2022-10-04T13:17:31",
        "id": 23,
        "messageType": 1,
        "roomId": 5,
        "sender": "test32",
        "message": "asdasdasd"
    },
    ...
]
```

---
그리고 웹소켓 예시 코드...  

`/src/main/resources/templates/chattest.html`
[Link](https://github.com/ckdhkdwns/egg-talk/blob/api/eggtalk/src/main/resources/templates/roomdetail.html)


## Versions

- <b>node.js</b> 16.17.1
- <b>jdk</b> 17.0.4 (openjdk)
- <b>springboot</b> 2.7.4

## Plan

