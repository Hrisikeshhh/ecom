const express = express();
const router = express();

router.get('/',(req, res)=>{
  res.send('index')
})

module.exports = router;