<template lang="pug">
  .page-posts.container
    h1.page-title Posts
    p 블로그 포스트 리스트
    post-list(:posts="loadedPosts")
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: { PostList },
  head: {
    title: '블로그',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: '블로그 포스트를 제공합니다.'
      }
    ]
  },
  computed: {
    // loadedPosts 속성
    loadedPosts() {
      // 스토어 객체 게터를 사용해 저장된 loadedPosts 읽기
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style lang="sass" scoped>
.page-title
  margin-bottom: 0
  font-family: Changa, Sans-Serif
  letter-spacing: -0.03em

p
  margin-top: 0
  color: rgba(#000, 0.5)
  font-size: 13px
  letter-spacing: -0.06em
</style>
