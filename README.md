# GreenMan

## 功能
- 用來控制Green Man綠巨人矩陣
- 提供一個網站來當作主要操作主要介面
- 伺服器端為NodeJS，架設在RaspberryPI上，底層通過Uart來發送訊號

## 模式
- 超音波互動
- 文字跑馬燈
- LED矩陣展示

## API
- green-man.js 提供直接傳入像素陣列，與可傳入字串自動轉成像素的功能
- green-man.js 設定綠巨人矩陣的規格(12x8)，與xy軸的像素位移後，即可產生protocal資料
- serialport 可將資料透過uart，送給綠巨人
- server.js 處理web介面的控制，透過green-man.js產生通訊資料，再經由serialport發出訊號

## 佈署
1. PI必須關閉藍芽，開啟原始uart，編輯/boot/config.txt，加入：
	
	```
	dtoverlay=pi3-miniuart-bt
	enable_uart=1
	```

2. 於green-man專案資料夾下，下載所需Modules：
	
	```
	npm install
	```

3. 測試：

	```
	npm run test <serial-port> <baudrate>
	```

4. 啟動伺服器：

	```
	node run start <port>
	```

5. 進入操作網站：
	
	```
	127.0.0.1:<port>
	```
	
## 參考組態
- Serial-Port /dev/ttyAMA0
- Baudrate 115200
- Green 3x2 4x4