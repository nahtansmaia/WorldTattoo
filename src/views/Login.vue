<template>
    <div>
        
        <ToolBarPrincipal propButtonPrincipalLabel="Home" propButtonPrincipalClick="Home" />
        <LoginComponent tabProp="Register"></LoginComponent>
    </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent';
import ToolBarPrincipal from '@/components/ToolBarPrincipal'
export default {
    name:"Login",
    components:{
        LoginComponent,
        ToolBarPrincipal
    }
    
}
</script>