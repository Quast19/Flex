<script>
	import { signIn } from "$lib/auth-client";
	import Button from "$lib/components/ui/button/button.svelte";
    const handleSignup = async () => {
        console.log("Reached in sign in...")
        signIn(); // implement signup logic with try catch shiz here.
    }

</script>
<Button onclick= {() => handleSignup()}>Signup</Button>
