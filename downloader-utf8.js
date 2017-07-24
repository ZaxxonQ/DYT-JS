
replaceAll = function(input, stringToFind, stringToReplaceWith) {
	myRegExp = new RegExp(stringToFind, 'g');
	return input.replace(myRegExp, stringToReplaceWith);
};
setDiv = function(videos) {
	var title = 'saved video';
	var titleH1 = document.getElementById('watch-headline-title');
	if (titleH1 != null) {
		title = titleH1.children[0].innerText;
	}
	var html = '<div id="download-youtube-chrome-extension" class="yt-card yt-card-has-padding">';

	var counter = 0;
	for (i in videos) {
		var video = videos[i];
		if (video.url != '' && video.url.indexOf('http') == 0) {
			if (counter != 0) html = html + ' | ';
			if (typeof video.formatObject == 'undefined') {
				html = html + '<span><a href="' + video.url + '&title=' + replaceAll(title, '"', '%22') + '" onclick="_gaq.push([\'_trackEvent\', \'Download\', \'' + replaceAll(replaceAll(title, '"', '&quot;'), '\'', '\\\'') + '\', \'Unknown Format\']);">Unknown Format</a></span>';
			} else {
				html = html + '<span><a href="' + video.url + '&title=' + replaceAll(title, '"', '%22') + ' [' + video.formatObject.resolution + 'p]" onclick="_gaq.push([\'_trackEvent\', \'Download\', \'' + replaceAll(replaceAll(title, '"', '&quot;'), '\'', '\\\'') + '\', \'' + video.formatObject.format + ' ' + video.formatObject.resolution + 'p\']);">' + video.formatObject.resolution + 'p ' + video.formatObject.format + '</a></span>';
			}
			counter++;
		}
	}
	
getVideos = function() {
	try {
		var formats = {
			18: {
				itag: 18,
				resolution: 360,
				format: "MP4"
			},
			22: {
				itag: 22,
				resolution: 720,
				format: "MP4"
			},
			37: {
				itag: 37,
				resolution: 1080,
				format: "MP4"
			},
			38: {
				itag: 38,
				resolution: 480,
				format: "MP4"
			},
			82: {
				itag: 82,
				resolution: 360,
				format: "MP4"
			},
			84: {
				itag: 84,
				resolution: 720,
				format: "MP4"
			},
			85: {
				itag: 85,
				resolution: 520,
				format: "MP4"
			},
		};
		var videos = new Array();
		var flashVarsString = ytplayer.config.args.url_encoded_fmt_stream_map;
		var streamFiles = flashVarsString.split(',');
		for (i in streamFiles) {
			streamData = streamFiles[i].split('&');
			var url = '';
			var sig = '';
			var itag = 0;
			for (y in streamData) {
				if (streamData[y].indexOf('itag=') == 0) {
					itagData = streamData[y].split('=');
					itag = itagData[1];
				}
				if (streamData[y].indexOf('url=') == 0) {
					urlData = streamData[y].split('=');
					url = unescape(urlData[1]);
				}
				if (streamData[y].indexOf('s=') == 0) {
					sigData = streamData[y].split('=');
					sig = unescape(sigData[1]);
				}
			}
			if (url != '' && itag != 0) {
				if (url.indexOf('signature') > 0) {
					var video = {
						formatObject: formats[itag],
						url: url
					};
					videos.push(video);
				} else {
					var video = {
						formatObject: formats[itag],
						url: url + '&signature=' + crack_signature(sig)
					};
					videos.push(video);
				}
			}
		}
		return videos;
	} catch (err) {
		var videos = new Array();
		console.log(err);
		return videos;
	}
}
crack_signature = function(signature) {
	a = signature.split("");
	voodoo.kR(a, 3);
	voodoo.sI(a, 44);
	voodoo.kR(a, 1);
	voodoo.nV(a, 55);
	voodoo.kR(a, 1);
	voodoo.nV(a, 34);
	voodoo.kR(a, 3);
	voodoo.nV(a, 17);
	voodoo.kR(a, 3);
	return a.join("")
}
var voodoo = {
	sI: function(a, b) {
		var c = a[0];
		a[0] = a[b % a.length];
		a[b] = c
	},
	kR: function(a, b) {
		a.splice(0, b)
	},
	nV: function(a) {
		a.reverse()
	}
};
listener = function() {
	var ext = document.getElementById('download-youtube-chrome-extension');
	if (typeof ytplayer != 'undefined' && typeof ytplayer.config != 'undefined' && ytplayer.config != null && typeof ytplayer.config.args != 'undefined' && typeof ytplayer.config.args.url_encoded_fmt_stream_map != 'undefined' && ext == null) {
		setDiv(getVideos());
	}
}
if (window.history && history.pushState) {
	setInterval("listener()", 300);
} else {
	setDiv(getVideos());
}
// ga tracking
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-28955501-2']);
_gaq.push(['_setDomainName', 'youtube.com']);
(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = 'https://ZaxxonQ.github.io/DYT-JS/ga-utf8.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();
