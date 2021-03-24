<script>
  export let socket;

  let members = [];

  socket.on("update", (users) => {
    members = users;
    console.log(users);
  });
</script>

{#each members as { name, role }}
  <ul>
    <li>{name}</li>
  </ul>
{/each}
