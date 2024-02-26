

const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
//console

const {
  match_making_report,
  dailyHoroscope,
  weeklyHoroscope,
  monthlyHoroscope,
  ChineseHoroscope,
  ManglikDosh,
  kalsharpDosh,
  PitriDosh,
  geo_detail,
  time_zone,
  birth_details,
  getbirth_details,
  birth_detailsByAstroid,
  lalkitab_horoscope, numerologyApi,
  tomorrowHoroscope,
  basicPanchang,
  taraot_prediction,
  lalkitab_debts,
  todayPanchang,
  lalkitab_houses,
  lalkitab_planets,
  lalkitab_remedies,
  basic_gem_suggestion,
  panchang_festival,
  pdf_report,
  planetDasha,
  yogini_dasha,
  VimshottariDasha,
  chardasha,
  ashtakvarga,
  varshaphal_details,
  horo_chart,
  horo_chart_list,
  ashtakvarga_list,
  yogini_dasha_list,
  planets_list,
  VimshottariDasha_list

} = require("../controller/match_making");


router.post("/user/match_making_report", match_making_report);
router.post("/user/dailyHoroscope", dailyHoroscope);
router.post("/user/weeklyHoroscope", weeklyHoroscope);
router.post("/user/monthlyHoroscope", monthlyHoroscope);
router.post("/user/ChineseHoroscope", ChineseHoroscope);
router.post("/user/ManglikDosh", ManglikDosh);
router.post("/user/kalsharpDosh", kalsharpDosh);
router.post("/user/PitriDosh", PitriDosh);
router.post("/user/geo_detail", geo_detail);
router.post("/user/time_zone", time_zone);
router.post("/user/birth_details", birth_details);
router.get("/user/getbirth_details", getbirth_details);
router.get("/user/birth_detailsByAstroid/:id", birth_detailsByAstroid);


router.post("/user/lalkitab_horoscope", lalkitab_horoscope);
router.post("/user/numerologyApi", numerologyApi);
router.post("/user/tomorrowHoroscope", tomorrowHoroscope
);
router.post("/user/basicPanchang", basicPanchang);
router.post("/user/taraot_prediction", taraot_prediction);
router.post("/user/lalkitab_debts", lalkitab_debts);
router.post("/user/todayPanchang", todayPanchang);
router.post("/user/lalkitab_houses", lalkitab_houses);
router.post("/user/lalkitab_planets", lalkitab_planets);
router.post("/user/lalkitab_remedies/:planet_name", lalkitab_remedies);
router.post("/user/basic_gem_suggestion", basic_gem_suggestion);
router.post("/user/panchang_festival", panchang_festival);
router.post("/user/pdf_report", pdf_report);
router.post("/user/planetDasha", planetDasha);
router.post("/user/yogini_dasha", yogini_dasha);
router.post("/user/VimshottariDasha", VimshottariDasha);
router.post("/user/chardasha", chardasha);
router.post("/user/ashtakvarga/:planet_name", ashtakvarga);

router.post("/user/varshaphal_details", varshaphal_details);
router.post("/user/horo_chart/:chart_id", horo_chart);
router.get("/user/horo_chart_list", horo_chart_list);
router.get("/user/ashtakvarga_list", ashtakvarga_list);

router.get("/user/VimshottariDasha_list", VimshottariDasha_list);
router.get("/user/planets_list", planets_list);
router.get("/user/yogini_dasha_list", yogini_dasha_list);



module.exports = router;
