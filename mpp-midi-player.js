const msgBox = function(about, info, duration, target) {
    MPP.client.emit("notification", {
        title: about,
        html: info,
        target: target,
        duration: duration
  });
  }
    function makeButton(name, id, row, column, func) {
        var midiDiv = document.getElementById("midi-btn");
        var btncln = midiDiv.cloneNode(true);
        btncln.textContent = name;
        btncln.id = id;
        btncln.onclick = func;
        var style = document.createElement('style');
        style.type = 'text/css';
        var rowpx = 300 + 120 * row;
        var colpx = 4 + 28 * column;
        style.innerHTML = '#' + id + ' { position: absolute; left: ' + rowpx + 'px; top: ' + colpx + 'px; }';
        document.getElementsByTagName('head')[0].appendChild(style);
        document.getElementById("bottom")
            .children[0].appendChild(btncln);
    }
    var on = false;
    makeButton("Midi Player", "laf", 4, 0, e => {
        if (!on) {

          msgBox('Midi Player', '<div id="midi-player-menu"><input id="midi-upload" type="file" accept="audio/midi"><button id="midi-play">Play</button><button id="midi-pause">Pause</button><br /><input type="checkbox" name="sustain" id= "midi-sus">sustain<br /><input type="range" id="midi-slider" min="0" max="100" step="1" value="0"></div>', -1, "#laf")
            on = true;
            document.getElementById("midi-upload").addEventListener("change", function() {
        		let reader = new FileReader();
        		reader.addEventListener("load", function() {
        			let midiFile = new MidiFile(reader.result);
        			midiPlayer.loadMidi(midiFile);
        			console.log(midiFile);
        		});
        		reader.readAsArrayBuffer(this.files[0]);
        	});
        	document.getElementById("midi-play").addEventListener("click", function() {
        		midiPlayer.play();
        	});
        	document.getElementById("midi-pause").addEventListener("click", function() {
        		midiPlayer.pause();
        	});
          document.getElementById("midi-sus").addEventListener("click", function() {
            midiPlayer.sustain = !midiPlayer.sustain;
          });
          document.getElementById("midi-slider").onchange = (() => {
            midiPlayer.skipToPercent(document.getElementById("midi-slider").value);
          });


        } else {

            on = false;

        }

    });
