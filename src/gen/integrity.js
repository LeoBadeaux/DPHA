(async () => {
	if (!window.scriptIsInjected) {

		window.scriptIsInjected = true;

		function redirectorCheck() {
			fetch(`https://hacks.prodigyhacking.com/game.min.js?updated=${Date.now()}`)
				.then(res => res.text())
				.then(response => {
					console.log("Connection to server was Successful!");
					const injectedScript = document.createElement("script");
					injectedScript.innerHTML = response;

					document.body.append(injectedScript);
				})
				.catch(async (error) => {
					eval(await (await fetch('https://unpkg.com/sweetalert2')).text());
					if (swal) {
						swal.fire({
							title: "Oh no!",
							html: `An error occurred when trying to fetch the hacks, this usually happens when your school blocks <a href="https://hacks.prodigyhacking.com">https://hacks.prodigyhacking.com</a>.<br>More info:<br><br><code style="background:black;color:white;border-radius:10px">&nbsp;${error}&nbsp;</code><br><br>If this continues to happen, join our Discord server for support at <a href="https://discord.gg/XQDfbfq">https://discord.gg/XQDfbfq</a>.`,
							icon: "error"
						})
					} else {
						const res = confirm(`Oh No! Something went wrong while trying to connect to the server! Try reloading this page. If this error continues to appear, hit ok to join our Discord for support, or create an issue on the GitHub. More info ${error}. This is normally caused by your school or organization blocking the hacks.`);
						if (res) location = "https://discord.gg/XQDfbfq";
					}
				});
		}
		setTimeout(redirectorCheck, 1000);

		// Disable integrity
		[...document.getElementsByTagName("script"), ...document.getElementsByTagName("link")].forEach(v => {
			if (v.integrity) {
				v.removeAttribute("integrity");
			}
		});
	}
})();