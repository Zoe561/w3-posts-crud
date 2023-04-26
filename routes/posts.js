const express = require('express');
const router = express.Router();
const Posts = require("../models/posts.model");

console.log('???');
router.get('/list', async (req, res) => {
    const posts = await Posts.find();
    res.status(200).json({
        status: "success",
        posts
    });
});

router.post('/posts', async (req, res) => {
    try {
        const data = req.body;
        const newPosts = await Posts.create({
            name: data.name,
            title: data.title,
            content: data.content,
            author: data.author,
            publishDate: data.publishDate,
            lastUpdateDate: data.lastUpdateDate,
            commentCount: data.commentCount,
            likeCount: data.likeCount,
            shareCount: data.shareCount,
            postCategory: data.postCategory,
            image: data.image,
            link: data.link
        })
        res.status(200).json({
            status: "success",
            posts: newPosts
        });
    } catch (error) {
        res.status(400).json({
            status: "false",
            message: "欄位沒有正確，或是沒有此ID",
            error: error
        });
        console.log(error);
    }
});

router.delete('/posts', async (req, res) => {
    const posts = await Posts.deleteMany({});
    res.status(200).json({
        status: "success",
        posts: []
    });
});

router.patch('/posts/:id', async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const posts = await Posts.findByIdAndUpdate(id, data, { new: true });
        if (posts === null) {
            res.status(404).json({ status: 'false', message: '無此網站路由或id' });
        } else {
            res.status(200).json({
                status: "success",
                posts: posts
            });
        }
    } catch (error) {
        res.status(500).json({ status: 'false', message: '發生錯誤' });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await Posts.findByIdAndDelete(id);
        console.log(posts);
        if (posts === null) {
            res.status(404).json({ status: 'false', message: '無此網站路由或id' });
        } else {
            res.status(200).json({
                status: "success"
            });
        }
    } catch (error) {
        res.status(500).json({ status: 'false', message: '發生錯誤' });
    }
});

router.options('*', async (req, res) => {
    res.status(200).end();
});

router.all('*', (req, res) => {
    res.status(404).json({
        "status": "false",
        "message": "無此網站路由",
    })
});

module.exports = router;