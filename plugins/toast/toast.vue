<template>
  <div>
    <v-snackbar
      v-model="isOpen"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :right="x === 'right'"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn color="pink" flat @click="close">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script src='./toast.ts' lang='ts' />

<style scoped>
</style>