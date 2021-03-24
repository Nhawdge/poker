<script>
  import Connect from "./Connect.svelte";
  import Poker from "./Poker.svelte";
  var name = "";
  var role = "";

  var socket = null;
  var isLoggedIn = false;
  function init() {
    socket = io.connect();
  }
  function logIn({ detail }) {
    console.log(detail);
    name = detail.name;
    role = detail.role;
    isLoggedIn = true;
  }
</script>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.3/socket.io.min.js"
    on:load={init}></script>
</svelte:head>

<main>
  <h1>Poker</h1>
  <span>
    {name} - {role}
  </span>

  {#if socket}
    {#if !isLoggedIn}
      <Connect {socket} on:loggedIn={logIn} />
    {/if}
    {#if isLoggedIn}
      <Poker {socket} />
    {/if}
  {/if}
</main>
