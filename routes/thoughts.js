const express = require('express')
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Thought = require('../models/Thought')

/////////////////////////////
// @descrip   Show Add Page
// @route     GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('thoughts/add')
})

/////////////////////////////
// @descrip   Process add form
// @route     POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Thought.create(req.body)
    res.redirect('/dash')
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

/////////////////////////////
// @descrip   Show All Thoughts
// @route     POST /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const thoughts = await Thought.find({ status: 'public' })
    .populate('user')
    .sort({ createdAt: 'desc'})
    .lean()

    res.render('thoughts/index', {
      thoughts,
    })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

/////////////////////////////
// @descrip   Show Edit Page
// @route     GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const thought = await Thought.findOne({
      _id: req.params.id,
    }).lean()

    if(!thought) return res.render('error/404')

    thought.user == req.user.id ?
      res.render('thoughts/edit', { thought }) :
      res.redirect('thoughts') ;

  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})


/////////////////////////////
// @descrip   Update Story
// @route     PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try{
    let thought = await Thought.findById(req.params.id).lean()

    if(!thought) return res.render('error/404')
      
    if(thought.user == req.user.id) {
      thought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dash')
    } else {
      res.redirect('thoughts') ;
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})


/////////////////////////////
// @descrip   Delete Story
// @route     DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Thought.remove({_id: req.params.id})
    res.redirect('/dash')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router