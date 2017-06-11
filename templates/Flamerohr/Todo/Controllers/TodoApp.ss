<html>
<head>
	<% base_tag %>
	<title>Todo list</title>
	<% require css('todo/client/dist/css/main.css') %>
</head>
<body>
<div class="todo__app" data-api-url="$ApiUrl" data-app-root="$AppRootUri">
	<div class="todo">
		<header><h1>Todo list</h1></header>
		<div class="body flex flex--from-top">
			<p>Please wait... waking up the early bird.</p>
			<div class="loading flex__grow"></div>
		</div>
		<footer>My actions here</footer>
	</div>
</div>
</body>
</html>

<% require javascript('todo/client/dist/js/vendor.js') %>
<% require javascript('todo/client/dist/js/main.js') %>
