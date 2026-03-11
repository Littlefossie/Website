fetch("https://status.cafe/users/littlefossie/status.json")
.then(r => r.json())
.then(r => {
  const content = r.content.length
    ?`
      <h2>Status and Feels</h2>
      <a href="https://status.cafe/users/littlefossie" target="_blank">
        ${r.author}
      </a>
      ${r.content}
      <br>
      Feeling: <a href="https://www.imood.com/users/Littlefossie"><img src="https://moods.imood.com/display/uname-Littlefossie/trans-0/imood.gif" border="1"></a>
      <br>
      Posted ${r.timeAgo}
    `:`
      <h2>Status and Feels</h2>
      No status yet.
    `;
  document.getElementById("pstatus").innerHTML = content;
});