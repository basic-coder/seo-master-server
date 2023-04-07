const express = require('express')
const { allReportFunc, CanonicalReportFunc, h1TagReportFunc, BrokenLinkReportFunc, LoadingTimeReportFunc, Canonical301ReportFunc, FindWordReportFunc } = require('../controller/mainController')
const router = express.Router()

router.route('/all-report').post(allReportFunc)
router.route('/canonical-report').post(CanonicalReportFunc)
router.route('/h1-report').post(h1TagReportFunc)
router.route('/broken-link-report').post(BrokenLinkReportFunc)
router.route('/loading-time').post(LoadingTimeReportFunc)
router.route('/canonical301').post(Canonical301ReportFunc)
router.route('/findword').post(FindWordReportFunc)

module.exports = router