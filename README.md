# Egg Talk

<b>Temporary Server URL</b> `https://egg-talk-server.run.goorm.io`  
<b>Chat</b> [Try it](https://egg-talk-server.run.goorm.io/chat/room/)

---

- [회원가입](#회원가입)  
- [로그인](#로그인)  
- [유저 정보 불러오기](#유저-정보-불러오기)  
- [유저 정보 수정하기](#유저-정보-수정하기)  

- [채팅방 생성하기](#채팅방-생성하기)
- [채팅방 목록 가져오기](#채팅방-목록-가져오기)
- [채팅방의 채팅들 불러오기](#채팅방의-채팅들-불러오기)
---

### 회원가입 
| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/user` | `False` |

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

| Method | Url | Token Necessity |
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

### 유저 정보 불러오기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/user` | `True` |

- 헤더에 토큰값을 추가해서 요청하면 서버에서는 토큰을 통해 사용자의 정보를 응답한다.
#### Requset header
```javascript
{
    ...
    "Authorization": "Bearer " + $token
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

### 유저 정보 수정하기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `PUT` | `/user` | `True` |

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

### 채팅방 목록 가져오기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/chat/room` | `Optional` |

- 헤더에 토큰이 있다면 토큰을 기반으로 특정 유저가 가지고 있는 채팅방 목록을 가져옴.
- 토큰으로 유저를 찾는 데 실패하거나 토큰이 없다면 모든 채팅방 목록을 가져옴.



#### Requset Header
1. 특정 유저의 채팅방 목록 반환
```javascript
{
    ...
    "Authorization": "Bearer " + $token
}
```
2. 모든 채팅방 목록 반환
```javascript
null
```

#### Response body
```javascript
//test value
[
    {
        "createdDate": "2022-10-04T13:38:50",
        "modifiedDate": "2022-10-04T13:38:50",
        "roomId": 10,
        "creatorId": "test32",
        "roomName": "testterdf"
    },
    {
        "createdDate": "2022-10-04T13:53:51",
        "modifiedDate": "2022-10-04T13:53:51",
        "roomId": 11,
        "creatorId": "test32",
        "roomName": "testterdf"
    }
]
```
---

### 채팅방 생성하기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/chat/room` | `True` |

- 방 제목을 통해 채팅방을 생성한다.

#### Request body
```javascript
{
    "roomName" : "My room!"
}
```
#### Response body
```javascript
{
    "creatorId": "test32",
    "roomName": "My room!",
    "userDtoSet": null
}
```

---

### 채팅방의 채팅들 불러오기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/chat/room/{roomId}` | `False yet` |

- 방 아이디를 통해 채팅 메세지들을 불러온다.

#### URL
`.../chat/room/5`

#### Response body

```javascript
//test value
[
    {
        "createdDate": "2022-10-04T12:42:40",
        "modifiedDate": "2022-10-04T12:42:40",
        "id": 20,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    },
    {
        "createdDate": "2022-10-04T12:42:43",
        "modifiedDate": "2022-10-04T12:42:43",
        "id": 21,
        "messageType": 1,
        "roomId": 5,
        "sender": "test32",
        "message": "ASDASDASD"
    },
    {
        "createdDate": "2022-10-04T13:17:28",
        "modifiedDate": "2022-10-04T13:17:28",
        "id": 22,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    },
    {
        "createdDate": "2022-10-04T13:17:31",
        "modifiedDate": "2022-10-04T13:17:31",
        "id": 23,
        "messageType": 1,
        "roomId": 5,
        "sender": "test32",
        "message": "asdasdasd"
    },
    {
        "createdDate": "2022-10-04T13:19:13",
        "modifiedDate": "2022-10-04T13:19:13",
        "id": 24,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    },
    {
        "createdDate": "2022-10-04T13:36:58",
        "modifiedDate": "2022-10-04T13:36:58",
        "id": 25,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    }
]
```

---

그리고 웹소켓 예시 코드...  

`/src/main/resources/templates/roomdetail.html`에서 확인 가능

```html
<!doctype html>
<html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">

<head>
	<title>Websocket ChatRoom</title>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<style>
		[v-cloak] {
			display: none;
		}
	</style>
</head>

<body>
	<div class="container" id="app" v-cloak>
		<div>
			<h2>{{room.name}}</h2>
		</div>
		<div class="input-group">
			<div class="input-group-prepend">
				<label class="input-group-text">내용</label>
			</div>
			<input type="text" class="form-control" v-model="message" v-on:keypress.enter="sendMessage">
			<div class="input-group-append">
				<button class="btn btn-primary" type="button" @click="sendMessage">보내기</button>
			</div>
		</div>
		<ul class="list-group">
			<li class="list-group-item" v-for="message in messages">
				{{message.sender}} - {{message.message}}
			</li>
		</ul>
		<div></div>
	</div>
	<!-- JavaScript -->
	<script src="https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
	<script>
		//alert(document.title);
		// websocket & stomp initialize
		var sock = new SockJS("/ws/chat");
		var ws = Stomp.over(sock);
		var reconnect = 0;
		// vue.js
		var vm = new Vue({
			el: '#app',
			data: {
				roomId: '',
				room: {
          name: 
        },
				sender: '',
				message: '',
				messages: [],
				token: ""
			},
			created() {
				this.roomId = // 어떻게 불러오기
        this.room.name = // 어떻게 불러오기
				this.findRoom();
			},
			methods: {
				sendMessage: function () {
					ws.send("/app/chat/message", 
						{Authorization: { this.token }}, 
            JSON.stringify({ 
              messageType: 1, 
            	roomId: this.roomId, 
              message: this.message 
          }));
					this.message = '';
				},
				recvMessage: function (recv) {
					this.messages.unshift({ 
            "type": recv.messageType, 
            "sender": recv.messageType == 0 ? '[알림]' : recv.sender, 
            "message": recv.message })}
			}
		});

		function connect() {
			// pub/sub event
			ws.connect({ Authorization: { this.token } }, function (frame) {
				ws.subscribe("/topic/chat/room/" + vm.$data.roomId, function (message) {
					var recv = JSON.parse(message.body);
					vm.recvMessage(recv);
				});
				ws.send("/app/chat/message", 
					{ Authorization: { this.token } }, 
          JSON.stringify({ 
          messageType: 0, 
          roomId: vm.$data.roomId, 
        }));
			}, function (error) {
				if (reconnect++ <= 5) {
					setTimeout(function () {
						console.log("connection reconnect");
						sock = new SockJS("/ws/chat");
						ws = Stomp.over(sock);
						connect();
					}, 10 * 1000);
				}
			});
		}
		connect();
	</script>
</body>

</html>
```

## Versions

- <b>node.js</b> 16.17.1
- <b>jdk</b> 17.0.4 (openjdk)
- <b>springboot</b> 2.7.4

## Plan

