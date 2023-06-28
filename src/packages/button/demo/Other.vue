<template>
  <EButton type="primary" round size="sm">
    123
    <EIcon name="errorOutline" color="#aaa" />
  </EButton>
  <EButton type="primary" plain size="md">123</EButton>
  <EButton type="primary" circle size="lg">123</EButton>
  <EButton type="primary" round size="lg">
    <template #icon>
      <EIcon name="errorOutline" color="#aaa" />
    </template>
  </EButton>
  <EButton round type="text">
    <template #icon>
      <EIcon name="close" color="#aaa" />
    </template>
  </EButton>
</template>
