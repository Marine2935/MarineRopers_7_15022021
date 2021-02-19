

<script>
import http from '../http';

export default {
    name: 'Post',
    methods: {
        getOnePost() {
            http.get('/posts/:post_id')
            .then()
        }
    }

}
</script>