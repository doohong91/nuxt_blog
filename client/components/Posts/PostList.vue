<template lang="pug">
  section.post-list
    PostPreview(
      v-for="post in posts",
      :key="post.id",
      :id="post.id",
      :isAdmin="isAdmin",
      :title="post.title",
      :thumbnail="post.thumbnail",
      :content="post.content"
    )
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: { PostPreview },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
  .post-list
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
    padding: 20px
</style>
