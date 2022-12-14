const f = document.getElementById('form');
		const q = document.getElementById('query');
		const google = '';
		const site = 'pagedart.com';

		function submitted(event) {
		event.preventDefault();
		const url = q.value;
		// const win = window.open(url, '_blank');
		// win.focus();
		// <a href="+url+"></a>
		// <div class="container_interactivo">
        //     <div class="ver-video">
		// 		<iframe width="560" height="315" src="url" frameborder="0" allowfullscreen></iframe>      
		// 	</div>
		// </div>
        question_panel = document.querySelector("#url");
		}

		f.addEventListener('submit', submitted);
      