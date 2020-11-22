<template>
  <div>
  <ContactComponent/>
  <ToolBarPrincipal propButtonPrincipalLabel="Login" propButtonPrincipalClick="Login" />
  </div>
</template>

<script>
import ContactComponent from '@/components/ContactComponent';
import ToolBarPrincipal from '@/components/ToolBarPrincipal'
export default {
  name: "Contact",
  components:{
    ContactComponent,
    ToolBarPrincipal,
  },
};
</script>