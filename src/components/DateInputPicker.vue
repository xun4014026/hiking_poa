<template>
  <v-menu
    v-model="menu"
    content-class="elevation-0"
    :transition="transition"
    :nudge-top="top"
    :nudge-left="left"
    :nudge-bottom="bottom"
    :nudge-right="right"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" :value="value"></slot>
    </template>
    <v-row justify="center" class="pa-4">
      <v-date-picker
        locale="zh-tw"
        @input="dateInput"
        no-title
        class="elevation-4"
        :color="color"
        :value="value"
      ></v-date-picker>
    </v-row>
  </v-menu>
</template>

<script>
export default {
  name: "date-input-picker",
  props: {
    top: Number,
    left: Number,
    right: Number,
    bottom: Number,
    value: String,
    color: String,
    transition: String
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    dateInput(value) {
      this.$emit("input", value);
      this.menu = false;
    }
  }
};
</script>
