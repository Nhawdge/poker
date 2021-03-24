<script>
  export let socket;
  var session;
  var name;
  var role;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function startSession(e) {
    e.preventDefault();
    console.log(name, session, role);
    socket.emit("start", { name, session, role });
    dispatch("loggedIn", { name, session, role });
  }
</script>

<form>
  <label for="name">Name</label>
  <input bind:value={name} />
  <label for="session">Session</label>
  <input bind:value={session} />
  <label for="role">Role</label>
  <select name="role" bind:value={role}>
    <option>Developer</option>
    <option>Project Manager</option>
  </select>
  <button on:click={startSession}> Create/Join</button>
</form>

<style>
</style>
