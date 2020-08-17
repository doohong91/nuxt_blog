<template lang="pug">
.page-admin-create.container
  section.create-post-form
    h2.page-title 포스트 생성
    p 새로운 글을 작성합니다.
    // PostForm 컴포넌트로부터 커스텀 이벤트 submit 수신
    // 이벤트가 수신되면 onSubmitted 메서드 실행
    post-form(@submit="onSubmitted")
</template>

<script>
import PostForm from '@/components/Admin/PostForm'

export default {
  layout: 'admin',
  components: { PostForm },
  head: {
    title: '관리자: 포스트 생성',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: '관리자 포스트 생성 페이지 입니다.'
      }
    ]
  },
  methods: {
    // 커스텀 이벤트 수신 메서드 정의
    onSubmitted(newPost) {
      // 스토어에 createPost 디스패치
      this.$store.dispatch('createPost', newPost).then(() => {
        // 플러그인 코드 적용
        this.$notify({
          group: 'admin-noti',
          type: 'success',
          title: '등록 성공!',
          text: '새 포스트 등록에 성공했습니다.',
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
