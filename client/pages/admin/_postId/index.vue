<template lang="pug">
.page-admin-post.container
  section.update-form
    h2.page-title 포스트 수정
    p 작성된 글을 수정합니다.
    post-form(:post="loadedPost", @submit="onSubmitted")
</template>

<script>
import PostForm from '@/components/Admin/PostForm'

export default {
  layout: 'admin',
  name: 'SinglePost',
  components: { PostForm },
  head() {
    const post = this.loadedPost
    return {
      title: `"${post.title}"`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${post.title} 포스트 수정 페이지 입니다.`
        }
      ]
    }
  },
  computed: {
    loadedPost() {
      const id = this.$route.params.postId
      return this.$store.getters.loadedPosts.find(
        post => post.title.replace(/\?/, '') === id
      )
    }
  },
  methods: {
    onSubmitted(editedPost) {
      // 스토어에 updatePost 디스패치
      this.$store.dispatch('updatePost', editedPost).then(res => {
        // 플러그인 코드 적용
        this.$notify({
          group: 'admin-noti',
          type: 'success',
          title: '수정 성공!',
          text: '포스트 수정에 성공했습니다.',
          duration: 2000,
          speed: 400
        })
        // 1초 뒤, 관리자 메인 페이지로 이동
        setTimeout(() => {
          this.$router.push('/admin')
        }, 1000)
      })
    }
  }
}
</script>
