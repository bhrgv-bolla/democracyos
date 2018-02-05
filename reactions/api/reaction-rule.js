const express = require('express')
const {
  OK,
  CREATED,
  NO_CONTENT
} = require('http-status')
const ReactionRule = require('../db-api/reaction-rule')

const router = express.Router()

router.route('/')
  .post(async (req, res, next) => {
    try {
      await ReactionRule.create(req.body)
      res.status(CREATED).end()
    } catch (err) {
      next(err)
    }
  })
  .get(async (req, res, next) => {
    try {
      let results = []
      if (req.query.name) {
        results = await ReactionRule.listByName({ name: req.query.name, limit: req.query.limit, page: req.query.page })
      } else {
        results = await ReactionRule.list({ limit: req.query.limit, page: req.query.page })
      }

      res.status(OK).json({
        results: results.docs,
        pagination: {
          count: results.total,
          page: results.page,
          limit: results.limit
        }
      })
    } catch (err) {
      next(err)
    }
  })

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const user = await ReactionRule.get(req.params.id)
      res.status(OK).json(user)
    } catch (err) {
      next(err)
    }
  })
  .put(async (req, res, next) => {
    try {
      await ReactionRule.update({ id: req.params.id, reactionRule: req.body })
      res.status(NO_CONTENT).end()
    } catch (err) {
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      await ReactionRule.remove(req.params.id)
      res.status(NO_CONTENT).end()
    } catch (err) {
      next(err)
    }
  })

module.exports = router