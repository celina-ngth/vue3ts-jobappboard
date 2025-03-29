import { DefineComponent } from 'vue';

declare module './Icon.vue' {
  const Icon: DefineComponent<{}, {}, any>;
  export default Icon;
}