# GreenMan

## 功能
- 用來控制GreenMan綠巨人矩陣
- 提供一個網站來當作主要操作主要介面
- 伺服器端為NodeJS，架設在RaspberryPI上，底層通過Uart來發送訊號

## 模式
- 超音波互動
- 文字跑馬燈
- LED矩陣展示

## 佈署
1. PI必須關閉藍芽，開啟原始uart，編輯/boot/config.txt，加入：
	
	```
	dtoverlay=pi3-miniuart-bt
	enable_uart=1
	```

2. 下載所需Modules：
	
	```
	npm install
	```

3. 啟動伺服器：

	```
	node server.js <port>
	```

4. 進入操作網站：
	
	```
	網址: 127.0.0.1:<port>
	```
	
## 組態
- Baudrate 115200
- Green 3x2 4x4