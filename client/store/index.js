// Vuex 패키지 불러오기
import Vuex from 'vuex'

// 스토어 생성 함수 정의
const createStore = () => {
  // Vuex.Store 객체 생성 반환
  return new Vuex.Store({
    // 상태(데이터)
    state: {
      loadedPosts: [],
      token: null
    },
    // 쓰기(동기 처리)
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      createPost(state, createdPost) {
        // 스토어의 loadedPosts 데이터에 createdPost 추가
        state.loadedPosts.push(createdPost)
      },
      updatePost(state, updatedPost) {
        const idx = state.loadedPosts.findIndex(
          post => post.id === updatedPost.id
        )
        state.loadedPosts[idx] = updatedPost
      },
      setToken(state, token) {
        state.token = token
      }
    },
    // 액션(비동기 처리 ⟹ 쓰기 커밋)
    actions: {
      // 액션에 nuxtServerInit 메서드를 추가하면
      // 서버에서 전달 받은 데이터를 초기화 과정에서 처리
      async nuxtServerInit({ commit }, { app }) {
        try {
          const data = await app.$axios.$get('/posts.json')
          const postsList = []
          for (let key in data) {
            // data[key] 데이터의 속성을 복사해서 postsList에 푸시
            postsList.push({ ...data[key], id: key })
          }
          commit('setPosts', postsList)
        } catch (e) {
          console.error(e)
        }
      },
      createPost({ commit, getters }, createdPost) {
        createdPost.createdDate = new Date().toLocaleString()
        createdPost.updatedDate = createdPost.createdDate
        // Firebase 데이터베이스와 통신
        return this.$axios
          .$post(`/posts.json?auth=${getters.token}`, createdPost)
          .then(data => {
            // 통신이 성공하면 뮤테이션에 커밋
            commit('createPost', { ...createdPost, id: data.name })
          })
          .catch(e => console.error(e))
      },
      updatePost({ commit, getters }, updatedPost) {
        updatedPost.updatedDate = new Date().toLocaleString()
        return this.$axios
          .$put(
            `/posts/${updatedPost.id}.json?auth=${getters.token}`,
            updatedPost
          )
          .then(data => {
            commit('updatePost', updatedPost)
          })
          .catch(e => console.error(e))
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts)
      },
      authUser({ commit }, authData) {
        const API_KEY = process.env.APIKey

        // this.isLogin ⟹ authData.isLogin 변경
        const authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${
          !authData.isLogin ? 'signupNewUser' : 'verifyPassword'
        }?key=${API_KEY}`

        // axios 프로미스(Promise) 반환
        return this.$axios
          .$post(authURL, {
            // this.email ⟹ authData.email 변경
            email: authData.email,
            // this.password ⟹ authData.password 변경
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            // 통신에 성공하면 토큰을 저장하는 setToken 뮤테이션 메서드를 실행
            commit('setToken', res.idToken)
          })
          .catch(e => console.error(e))
      }
    },
    // 읽기
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      token(state) {
        return state.token
      }
    }
  })
}

// createStore 함수 모듈 기본으로 내보내기
export default createStore
