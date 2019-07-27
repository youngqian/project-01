<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="欢迎吐槽~" maxlength="120" v-model='msg'></textarea>
    <mt-button type="primary" size="large" @click='postComments'>发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for='(item, i) in comments' :key='i'>
          <div class="cmt-title">
              第{{ i + 1 }}楼 &nbsp; &nbsp; 用户:{{ item.user_name }} &nbsp;&nbsp;&nbsp; 发表时间：{{ item.add_time | dataFormat }}
          </div>
          <div class="cmt-body">
              {{ item.content === 'undefined' ? '未发表评论' : item.content }}
          </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click='getMore'>加载更多</mt-button>
  </div>
</template>

<script>

import { Toast } from "mint-ui";

export default {
    props: ['id'],
    data() {
        return {
            pageindex : 1,//莫人展示第一页数据
            comments: [],
            msg: ''//评论输入的内容
        }
    },
    created() {
        this.getCmments()
    },
    methods: {
        getCmments() {
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
            .then( res => {
                if(res.body.status === 0) {
                    console.log(res.body.message);
                    //每当获取新评论的时候，不要覆盖老数据，而是一起展现在页面
                    this.comments = this.comments.concat(res.body.message)
                } else {
                    Toast('获取评论失败')
                }
            })
        },
        getMore() {
            this.pageindex++;
            this.getCmments()
        },
        postComments() {
            //校验内容是否为空
            if(this.msg.trim().length === 0) {
                return Toast('评论不能为空')
            }
            this.$http.post('api/postcomment/' + this.$route.params.id, {
                content: this.msg.trim()
            })
            .then( function(res) {
                if (res.body.status === 0) {
                    var cmt = {
                        user_name: '匿名大侠',
                        add_time: Date.now(),
                        content: this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = ''
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
.cmt-container {

    h3{
        color: #444;
        font-size: 16px;
    }
    textarea {
        font-size: 12px;
    }
    .cmt-item {
        font-size: 12px;
        color: #8f8f94;
        border-bottom: 1px  solid #ccc;
        margin: 5px 0;
        .cmt-title {
            background-color: rgb(192, 235, 248);
        }
        .cmt-body {
            padding: 0 10px;
        }
    }
}
</style>


