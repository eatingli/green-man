# GreenMan

## 功能
- 控制Green Man綠巨人矩陣
- 提供一個網站來作為主要操作介面
- 伺服器端為NodeJS，架設在RaspberryPI上，底層通過Uart來發送訊號
- 動畫的實作為：walk像素 -> 延遲 -> walk空白 -> 延遲

## 模式
- 超音波互動
- 文字跑馬燈
- 靜態展示

## 佈署
1. PI必須關閉藍芽，開啟原始uart，編輯/boot/config.txt，加入：
	
	```
	dtoverlay=pi3-miniuart-bt
	enable_uart=1
	```

2. 於green-man專案資料夾下，安裝模組：
	
	```
	$ npm install
	```

3. 測試：

	```
	$ sudo npm run test <serial-port> <baudrate>
	```

4. 啟動伺服器：

	```
	$ sudo node run start <server-port> <serial-port> <baudrate>
	```

5. 進入網站：
	
	```
	127.0.0.1:<server-port>
	```
	
## 參考組態
- Server-Port 8085
- Serial-Port /dev/ttyAMA0
- Baudrate 115200