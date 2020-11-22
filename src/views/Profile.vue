<template>
  <div id="Profile">
    <ProfileScreen />
    <ToolBarLogin/>
  </div>
</template>

<script>
import ToolBarLogin from "@/components/ToolBarLogin"
import ProfileScreen from "@/components/ProfileScreen";
export default {
  name: "ProfileScreenImp",
  components: {
    ProfileScreen,
    ToolBarLogin
  },
};
</script>