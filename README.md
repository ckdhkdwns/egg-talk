# Egg Talk

> Temporary Server URL `https://egg-talk-server.run.goorm.io`  


## Table of content

- [DB Model](#db-model)
- [Usage](#usage)
    - `Auth Controller` `.../auth`
        - [로그인](#로그인)  
        - [현재 유저 정보 불러오기](#현재-유저-정보-가져오기)  
    - `User Controller` `.../users`
        - [회원가입](#회원가입)  
        - [유저 정보 수정하기](#유저-정보-수정하기)  
        - [유저가 접속해있는 채팅방 리스트 가져오기](#유저가-접속해있는-채팅방-리스트-가져오기)
        - [특정 유저 정보 가져오기](#특정-유저-정보-가져오기)
    - `Room Controller` `.../rooms`
        - [채팅방 생성하기](#채팅방-생성하기)
        - [모든 채팅방 목록 가져오기](#모든-채팅방-목록-가져오기)
        - [채팅방 내의 메세지 리스트 가져오기](#채팅방-내의-메세지-리스트-가져오기)
        - [채팅방 내의 유저 리스트 가져오기](#채팅방에-접속해-있는-유저-리스트-가져오기)
## DB model
![db](https://user-images.githubusercontent.com/66898263/194763686-a649e3a2-7fb0-4735-b77c-bdae5ec988eb.svg)


## Usage

### Data Types
각 컬럼들의 데이터 타입이다. 
| Column | Data type | Minimum length | Maximum length |
|:---:|:---:|:---:|:---:|
| `username` | `String` | `3 ` |  `50 ` |
| `password` | `String` | `8 ` |  `100 ` |
| `gender` | `Boolean` | `1 ` |  `1 ` |
| `email` | `String` | `5 ` |  `50 ` |
| `roomId` | `Integer` | `1 ` |  `11 ` |
| `roomName` | `String` | `5 ` |  `50 ` |
| `messageType` | `Integer` | `1 ` |  `1 ` |
| `content` | `String` | `1 ` |  `1000 ` |


### 로그인
아이디와 비밀번호를 통해 토큰을 발급받음.

####  Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/auth` | `False` |

#### Request
```json
{
    "userId": "ckdhkdwns",
    "password": "1q2w3e4r",
}
```

#### Response
```json
{
    "token": "token_value"
}
```

<br/><br/>

### 현재 유저 정보 가져오기
헤더의 토큰에 담긴 유저의 정보를 가져온다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/auth/me` | `True` |

#### Request 
```javascript
//skip
```

#### Response
```json
{
    "username": "ckdhkdwns",
    "gender": true,
    "email": "test@test.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>

### 회원가입 
`username`, `password`, `gender`, `email`을 통해 가입한다.
#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/users` | `False` |

#### Request
```json
{
    "username": "dbswnduf",
    "password": "1q2w3e4r",
    "gender": false,
    "email": "wnduf@email.com"
}
```
#### Response

```json
{
    "username": "dbswnduf",
    "gender": false,
    "email": "wnduf@email.com"
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>

### 특정 유저 정보 가져오기

`username`에 해당하는 유저의 정보를 가져온다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/users/{username}` | `True` |

#### Example URL

`.../users/ckdhkdwns`

#### Response
```json
{
    "username": "ckdhkdwns",
    "gender": false,
    "email": "zhdqks@naver.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>


### 유저 정보 수정하기
- URL의 `username`과 토큰의 `username`이 일치하면 해당 아이디의 유저 정보를 수정함.
- 비밀번호, 이메일을 수정할 수 있다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `PUT` | `/users/{username}` | `True` |

#### Requset
```json
{
    "password": "1q2w3e4r",
    "email": "zhdqks@naver.com"
}
```

#### Response
```json
{
    "username": "ckdhkdwns",
    "gender": false,
    "email": "zhdqks@naver.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>

### 모든 채팅방 목록 가져오기
모든 채팅방 목록을 가져옴

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms` | `True` |



#### Request
```javascript
//skip
```
#### Response
```json
[
    {
        "createdDate": "2022-10-09T14:17:44",
        "roomId": 3,
        "roomName": "차왕준의 롤토체스"
    },
    {
        "createdDate": "2022-10-09T14:16:39",
        "roomId": 2,
        "roomName": "hello123"
    },
    {
        "createdDate": "2022-10-09T14:15:39",
        "roomId": 1,
        "roomName": "hello123"
    }
]
```
<br/><br/>

### 유저가 접속해있는 채팅방 리스트 가져오기
URL의 `username`과 토큰의 `username`이 일치하면 해당 아이디의 유저 정보를 가져옴.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/users/{username}/rooms` | `True` |

#### Example URL

`.../users/ckdhkdwns/rooms`

#### Response
```json
[
    {
        "createdDate": "2022-10-09T14:16:39",
        "roomId": 2,
        "roomName": "hello123"
    },
    {
        "createdDate": "2022-10-09T14:17:44",
        "roomId": 3,
        "roomName": "차왕준의 롤토체스"
    }
]
```
<br/><br/>

### 채팅방 생성하기

채팅방을 생성한다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/rooms` | `True` |

#### Request
```json
{
    "roomName" : "My room!"
}
```
#### Response
```json
{
    "createdDate": "2022-10-10T04:50:10.515197183",
    "roomId": 6,
    "roomName": "My room!"
}
```
<br/><br/>

### 채팅방 내의 메세지 리스트 가져오기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms/{roomId}/messages` | `True` |

- 방 아이디를 통해 채팅 메세지들을 불러온다.

#### Example URL
`.../rooms/6/messages`

#### Response
```json
[
    {
        "id": 1,
        "userId": 2,
        "username": "ckdhkdwns",
        "roomId": 3,
        "messageType": 0,
        "content": "ckdhkdwns님이 입장하였습니다.",
        "createdDate": "2022-10-09T14:31:42"
    },
]
```
<br/><br/>

### 채팅방에 접속해 있는 유저 리스트 가져오기
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms/{roomId}/users` | `True` |
- 채팅방에 접속해 있는 유저의 정보들을 가져온다.

#### Example URL
`.../rooms/3/users`

#### Response
```json
[
    {
        "createdDate": "2022-10-09T14:15:20",
        "username": "ckdhkdwns",
        "gender": false,
        "email": "zhdqks@naver.com"
    },
    {
        "createdDate": "2022-10-09T14:47:36",
        "username": "juyeolyoon",
        "gender": false,
        "email": "different"
    }
]
```


## Websocket client code

`/src/main/resources/templates/chattest.html`
[Link](https://github.com/ckdhkdwns/egg-talk/blob/api/eggtalk/src/main/resources/templates/chattest.html)

#### GET Params
`token`, `roomId`


## Versions

- <b>node.js</b> 16.17.1
- <b>jdk</b> 17.0.4 (openjdk)
- <b>springboot</b> 2.7.4

