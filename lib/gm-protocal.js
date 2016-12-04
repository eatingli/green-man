var GmProtocal = module.exports = {};

//protocol: Header - ID - Mode - Walk - Run - Chksum
GmProtocal.generateData = function(id, mode, walk, run) {

	var checksum = getChecksum([id, mode, walk >> 8, walk & 0xff, run >> 8, run & 0xff]);
	var data = [0xA6, 0xA6, id, mode, walk >> 8, walk & 0xff, run >> 8, run & 0xff, checksum];
	return data;
}


function getChecksum(values) {
	var checksum = 0;
	for (var i = 0; i < values.length; i++) checksum += values[i];
	return (checksum & 0xff) ^ 0xff;
}