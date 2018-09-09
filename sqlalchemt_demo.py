from flask import Flask,render_template,request,jsonify
from config import Article,session
#导入

app = Flask(__name__)


@app.route('/',methods=['GET','POST'])
def index():
    if request.method =='GET':
        return render_template('index.html')
    else:
        index = int(request.form.get('count'))
        # 获取十篇帖子
        posts_obj =session.query(Article).slice(index, index + 10)

        posts = []
        for post in posts_obj:
            posts.append({'title':post.title,'content':post.content})
            # 将帖子返回到前端
        return jsonify({'code':200,'data':posts})



if __name__ == '__main__':
    app.run(debug = True)
