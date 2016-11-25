# GreenMan

## 功能
- WebApp來操作主要功能
- 伺服器端為NodeJS，架設在RaspberryPI上，通過Uart控制GreenMan硬體

## 模式
- 超音波互動
- 文字跑馬燈
- LED矩陣展示

## 使用
1. 安裝 Modules
	
	```
	npm install

	```

2. 啟動伺服器

	```
	node server.js
	```

3. 進入WebApp
	
	```
	網址: 127.0.0.1:8080
	```
	
## 組態
- Baudrate 115200
- Green 3x2 4x4