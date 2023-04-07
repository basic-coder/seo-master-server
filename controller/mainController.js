const { Canonical } = require("../utils/Canoncial");
const { Canonical301 } = require("../utils/Canonical301");
const { BrokenLinks } = require("../utils/brokenLinks");
const { getAllUrls } = require("../utils/getAllUrls");
const { h1Tags } = require("../utils/h1Tags");
const { linkLoadingTime } = require("../utils/loadingTime");
const fs = require('fs');
const { searchWordInWebPages } = require("../utils/searchWords");
const arrayOfLink = ["https://www.iffcotokio.co.in/health-insurance/10-factors-that-affect-your-health-insurance-premium-costs",
"https://www.iffcotokio.co.in/health-insurance/4-common-exclusions-in-a-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/4-reasons-why-your-health-insurance-claim-could-be-rejected",
"https://www.iffcotokio.co.in/health-insurance/4-vital-reasons-to-have-critical-illness-rider-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/5-common-myths-about-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/5-reasons-to-buy-health-insurance-in-your-30s",
"https://www.iffcotokio.co.in/health-insurance/5-reasons-why-medical-insurance-is-a-necessity-not-an-option",
"https://www.iffcotokio.co.in/health-insurance/5-reasons-why-you-should-invest-in-health-insurance-early",
"https://www.iffcotokio.co.in/health-insurance/5-situations-when-your-health-insurance-provider-can-turn-down-your-claim",
"https://www.iffcotokio.co.in/health-insurance/5-ways-medical-expenses-help-you-save-taxes",
"https://www.iffcotokio.co.in/health-insurance/9-questions-you-must-ask-before-buying-a-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/a-layman-s-guide-to-health-insurance-coverage",
"https://www.iffcotokio.co.in/health-insurance/all-you-need-to-know-about-mediclaim-policy-in-india",
"https://www.iffcotokio.co.in/health-insurance/are-maternity-pregnancy-related-expenses-covered-under-health-insurance-plans",
"https://www.iffcotokio.co.in/health-insurance/are-naturopathy-and-homeopathy-treatments-covered-under-a-health-policy",
"https://www.iffcotokio.co.in/health-insurance/are-there-any-waiting-periods-when-my-expenses-will-not-be-settled-in-case-of-a-contingency",
"https://www.iffcotokio.co.in/health-insurance/arogya-sanjeevani-policy",
"https://www.iffcotokio.co.in/health-insurance/article-listing",
"https://www.iffcotokio.co.in/health-insurance/benefits-of-buying-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/benefits-of-cancer-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/buying-a-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/buying-guidelines-for-senior-citizen-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/can-i-avail-this-health-insurance-policy-if-i-am-not-an-indian-national-but-living-in-india",
"https://www.iffcotokio.co.in/health-insurance/can-i-buy-more-than-one-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/cancer-insurance-plan-a-comprehensive-coverage-for-all-stages-of-cancer",
"https://www.iffcotokio.co.in/health-insurance/city",
"https://www.iffcotokio.co.in/health-insurance/claims",
"https://www.iffcotokio.co.in/health-insurance/common-health-insurance-terms",
"https://www.iffcotokio.co.in/health-insurance/compare-health-insurance-plans-and-medical-policies-in-india",
"https://www.iffcotokio.co.in/health-insurance/comprehensive-critical-illness-insurance-for-cancer-coverage",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/article-listing",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/can-i-also-cover-my-family-members-under-this-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/can-this-insurance-policy-be-cancelled-by-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/does-corona-kavach-policy-also-cover-medical-check-up-expenses",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/does-this-health-insurance-plan-cover-maternity-expenses",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/faq",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/how-many-family-members-does-this-plan-cover",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/is-there-any-medical-test-required-to-buy-this-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/key-benefits-of-iffco-tokio-swasthya-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-are-add-on-covers",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-do-you-mean-by-sub-limit",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-is-domiciliary-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-is-not-covered-under-corona-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-is-the-eligibility-criterion-for-buying-corona-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-is-the-maximum-entry-age-to-buy-this-product",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-is-the-policy-tenure-for-corona-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-is-the-process-to-raise-a-claim-for-corona-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/what-is-waiting-period",
"https://www.iffcotokio.co.in/health-insurance/corona-kavach-policy/will-this-policy-cover-home-quarantine-expenses-or-hospital-quarantine-expenses",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/are-there-any-tax-benefits-under-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/can-i-also-cover-my-family-members-under-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/does-the-corona-rakshak-policy-cover-medical-check-up-expenses",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/faq",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/is-there-any-medical-test-required-to-buy-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/is-there-any-waiting-period-applicable-under-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/what-are-the-benefits-offered-by-a-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/what-are-the-sum-insured-options-available-under-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/what-is-a-corona-rakshak-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/what-is-not-covered-under-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/what-is-the-process-to-raise-a-claim-for-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/corona-rakshak-policy/what-should-my-age-be-to-get-covered-under-the-corona-rakshak-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-benefit-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-benefit-policy-new",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance-beyond-just-cancer-coverage",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance-myths-and-facts",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/all-about-critical-illness-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/all-about-critical-illness-plans-and-how-to-choose-one",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/all-about-the-critical-illness-insurance-policy-and-tips-to-choose-them",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/article-listing",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/benefits-of-buying-critical-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/buy-critical-illness-plan-as-rider-or-standalone-insurance-from-iffco",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/can-i-make-multiple-claims-for-the-same-or-any-other-listed-critical-illnesses",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/can-i-transfer-my-critical-illness-policy-from-one-insurance-company-to-another",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/critical-illness-health-insurance-terms-you-need-to-know",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/do-all-insurance-providers-in-india-cover-the-same-critical-illnesses",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/do-i-need-to-undergo-medical-tests-to-get-critical-illness-cover",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/faq",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/how-can-i-buy-critical-illness-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/how-many-times-can-i-make-a-claim-against-my-critical-illness-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/terms-and-conditions-of-buying-critical-illness-policy-from-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/what-are-the-benefits-of-critical-illness-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/what-are-the-documents-required-at-the-time-of-a-claim-under-critical-illness-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/what-are-the-major-critical-illnesses-covered-under-a-critical-illness-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/what-is-critical-illness",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/what-is-the-survival-period-under-a-critical-illness-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/what-things-to-keep-in-mind-while-buying-critical-illness-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/why-buy-critical-health-insurance-online",
"https://www.iffcotokio.co.in/health-insurance/critical-illness-insurance/why-to-buy-critical-illness-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/different-types-of-health-insurance-policies-and-their-benefits",
"https://www.iffcotokio.co.in/health-insurance/do-i-get-a-discount-on-renewal-of-the-policy-with-the-same-company",
"https://www.iffcotokio.co.in/health-insurance/do-you-have-a-suitable-medical-plan",
"https://www.iffcotokio.co.in/health-insurance/does-health-insurance-cover-diagnostic-charges-like-x-ray-mri-or-ultrasound",
"https://www.iffcotokio.co.in/health-insurance/dos-and-donts-while-buying-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/eligibility-and-documents-required-for-buying-cancer-insurance",
"https://www.iffcotokio.co.in/health-insurance/essential-tips-to-keep-in-mind-while-buying-a-critical-illness-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance-2",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance-3",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance-plans",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/are-diagnostic-and-investigative-tests-covered-under-the-family-mediclaim-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/article-listing",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/can-i-buy-more-than-one-family-health-plans",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/can-i-transfer-my-health-insurance-plans-for-the-family-from-one-insurance-company-to-another-without-losing-the-renewal-benefits",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/claim-procedure-for-iffco-tokio-family-health-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/does-your-family-medical-insurance-plan-cover-daycare-procedures",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/does-your-health-insurance-plan-for-family-cover-everything-from-accident-surgery-normal-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/dos-and-don",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/faq",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/features-of-family-iffco-tokio-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/how-can-i-buy-a-family-medical-insurance-policy-from-your-company",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/how-is-a-pre-existing-condition-defined-under-family-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/how-many-people-can-be-covered-by-family-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/i-have-a-life-insurance-policy-do-i-still-need-a-family-health-plan",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/i-have-a-small-family-and-we-all-are-young-and-healthy-individuals-we-lead-a-very-healthy-lifestyle-and-have-never-been-to-a-doctor-do-i-still-need-a-family-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/if-my-policy-is-not-renewed-in-time-before-the-expiry-date-will-i-be-denied-for-renewal",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/importance-of-family-floater-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/is-cashless-facility-available-under-mediclaim-policy-for-family-is-cashless-facility-available-under-mediclaim-policy-for-family",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/is-there-any-waiting-period-for-claims-under-a-family-health-plan",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/premium-calculator-for-the-best-cashless-mediclaim-policy-for-family-members",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-are-main-features-of-family-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-are-the-advantages-of-sticking-to-one-insurance-company-for-a-long-time",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-are-the-benefits-of-a-family-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-are-the-expenses-that-are-covered-under-a-family-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-are-the-factors-that-affect-the-family-health-insurance-premium",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-are-the-situations-under-which-i-may-be-denied-cashless-hospitalization-under-your-family-health-insurance-plans",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-are-the-tax-benefits-i-get-if-i-opt-for-family-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-do-you-mean-by-family-floater-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-does-a-family-health-insurance-policy-not-cover",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-happens-if-i-exhaust-the-sum-insured-of-my-policy",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-happens-to-the-mediclaim-policy-for-the-familys-coverage-after-a-claim-is-filed",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-is-family-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-is-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-is-the-key-to-a-successful-claim-for-health-insurance-plans-for-a-family-in-case-of-emergency-and-planned-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-is-the-maximum-number-of-claims-allowed-over-a-year",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/what-kinds-of-family-health-insurance-covers-are-available",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/which-family-health-insurance-policies-are-offered-by-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/which-family-member-can-i-cover",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/who-can-help-me-calculate-my-family-mediclaim-policy-premium",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/who-should-opt-for-a-family-medical-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/family-health-insurance/why-is-a-mediclaim-policy-for-family-important",
"https://www.iffcotokio.co.in/health-insurance/faq",
"https://www.iffcotokio.co.in/health-insurance/have-you-bought-a-suitable-medical-plan",
"https://www.iffcotokio.co.in/health-insurance/health-insurance-for-senior-citizens",
"https://www.iffcotokio.co.in/health-insurance/health-insurance-policy-exclusions-you-should-know-about",
"https://www.iffcotokio.co.in/health-insurance/health-insurance-premiums-how-they-rise-as-you-grow-older",
"https://www.iffcotokio.co.in/health-insurance/health-insurance-wellness-service",
"https://www.iffcotokio.co.in/health-insurance/health-protector-max",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/after-how-many-months-will-pre-existing-diseases-get-covered-under-the-policy",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/faq",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/is-organ-donation-covered-in-the-policy",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/what-are-the-documents-required-to-file-a-claim",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/what-are-the-services-offered-under-the-emergency-assistance-services",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/what-is-the-free-look-in-period-offered-with-health-protector-plus-policy",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/what-is-the-pre-and-post-hospitalization-cover-offered-under-this-policy",
"https://www.iffcotokio.co.in/health-insurance/health-protector-plus-policy/what-is-the-time-period-for-registration-of-a-claim-under-this-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/here-is-why-you-need-to-start-early-with-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/hospital-daily-cash-policy",
"https://www.iffcotokio.co.in/health-insurance/how-can-i-increase-my-sum-assured-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/how-do-i-find-the-best-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/how-do-i-register-for-health-insurance-renewal-online",
"https://www.iffcotokio.co.in/health-insurance/how-do-i-renew-my-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/how-does-health-insurance-claim-process-work",
"https://www.iffcotokio.co.in/health-insurance/how-does-health-insurance-policy-work",
"https://www.iffcotokio.co.in/health-insurance/how-does-senior-citizen-health-insurance-help",
"https://www.iffcotokio.co.in/health-insurance/how-does-swasthya-raksha-bima-benefit-consumers-in-non-metro-cities",
"https://www.iffcotokio.co.in/health-insurance/how-does-the-insurance-company-decide-whether-a-disease-was-a-pre-existing-one-or-not",
"https://www.iffcotokio.co.in/health-insurance/how-is-critical-illness-cover-different-from-normal-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/how-much-health-insurance-cover-do-you-require",
"https://www.iffcotokio.co.in/health-insurance/how-to-choose-the-best-critical-illness-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/how-to-claim-a-cashless-facility-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/how-to-claim-tax-benefits-on-medical-insurance-premiums",
"https://www.iffcotokio.co.in/health-insurance/how-to-make-full-use-of-section-80d-to-save-tax-on-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/how-to-select-best-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/how-to-select-right-sum-insured",
"https://www.iffcotokio.co.in/health-insurance/i-am-young-and-healthy-do-i-really-need-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/i-have-a-health-insurance-policy-but-i-want-to-increase-the-sum-insured-what-should-i-do",
"https://www.iffcotokio.co.in/health-insurance/importance-and-benefits-of-health-insurance-plan-in-india",
"https://www.iffcotokio.co.in/health-insurance/importance-of-buying-a-proper-health-insurance-policy-today",
"https://www.iffcotokio.co.in/health-insurance/importance-of-buying-health-insurance-in-india",
"https://www.iffcotokio.co.in/health-insurance/importance-of-sum-insured-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/important-health-insurance-terms-one-must-know",
"https://www.iffcotokio.co.in/health-insurance/improve-your-health",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/article-listing",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/benefits-of-buying-iffco-tokio-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/benefits-of-individual-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/can-i-buy-more-than-one-family-health-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/can-i-buy-more-than-one-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/can-i-transfer-my-health-insurance-plans-from-one-insurance-company-to-another-without-losing-the-renewal-benefits",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/cancellation-of-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/claims-procedure-of-iffco-tokio-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/does-your-health-insurance-plan-for-cover-everything-from-accident-surgery-normal-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/during-the-course-of-my-treatment-can-i-change-the-hospitals",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/exclusions-of-iffco-tokio-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/faq",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/how-can-i-buy-a-medical-insurance-policy-from-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/how-do-i-get-my-insurance-claim",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/how-is-a-pre-existing-condition-defined-under-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/how-long-is-an-individual-health-protector-policy-valid-for",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/if-my-policy-is-not-renewed-in-time-before-the-expiry-date-will-i-be-denied-for-renewal",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/is-cashless-facility-available-under-mediclaim-policy-for-me",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/is-there-any-waiting-period-for-claims-under-a-health-plan",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-are-the-advantages-of-sticking-to-one-insurance-company-for-a-long-time",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-are-the-factors-that-affect-the-family-health-insurance-premium",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-are-the-situations-under-which-i-may-be-denied-cashless-hospitalization-under-your-health-insurance-plans",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-are-the-tax-benefits-i-get-if-i-opt-for-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-do-you-mean-by-individual-health-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-does-a-health-insurance-policy-not-cover",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-happens-to-the-health-insurance-policy-coverage-after-a-claim-is-filed",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-is-a-network-hospital",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-is-covered-under-an-individual-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-is-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-is-the-key-to-a-successful-claim-for-health-insurance-plans-for-myself-in-case-of-emergency-or-planned-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-is-the-maximum-number-of-claims-allowed-over-a-year",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-kinds-are-health-insurance-policies-offered-by-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/what-kinds-of-family-health-insurance-plans-are-available",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/who-should-buy-individual-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance/why-is-a-health-mediclaim-policy-important",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/article-listing",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/benefits-of-buying-iffco-tokio-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/benefits-of-individual-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/can-i-transfer-my-health-insurance-plans-from-one-insurance-company-to-another-without-losing-the-renewal-benefits",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/cancellation-of-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/claims-procedure-of-iffco-tokio-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/does-your-health-insurance-plan-for-cover-everything-from-accident-surgery-normal-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/during-the-course-of-my-treatment-can-i-change-the-hospitals",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/exclusions-of-iffco-tokio-individual-health-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/faq",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/how-can-i-buy-a-medical-insurance-policy-from-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/how-do-i-get-my-insurance-claim",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/how-is-a-pre-existing-condition-defined-under-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/if-my-policy-is-not-renewed-in-time-before-the-expiry-date-will-i-be-denied-for-renewal",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/is-cashless-facility-available-under-mediclaim-policy-for-me",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/is-there-any-waiting-period-for-claims-under-a-health-plan",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-are-the-advantages-of-sticking-to-one-insurance-company-for-a-long-time",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-are-the-factors-that-affect-the-family-health-insurance-premium",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-are-the-situations-under-which-i-may-be-denied-cashless-hospitalization-under-your-health-insurance-plans",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-are-the-tax-benefits-i-get-if-i-opt-for-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-do-you-mean-by-individual-health-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-does-a-health-insurance-policy-not-cover",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-is-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-is-the-key-to-a-successful-claim-for-health-insurance-plans-for-myself-in-case-of-emergency-or-planned-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-is-the-maximum-number-of-claims-allowed-over-a-year",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-kinds-are-health-insurance-policies-offered-by-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/what-kinds-of-family-health-insurance-plans-are-available",
"https://www.iffcotokio.co.in/health-insurance/individual-health-insurance1/why-is-a-health-mediclaim-policy-important",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy/article-listing",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy/faq",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy/mediclaim-policy-for-senior-citizens",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy/top-features-of-individual-medishield-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy/what-are-few-things-to-know-before-buying-the-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy/what-are-some-of-the-key-benefits-of-buying-individual-medishield-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-medishield-policy/what-is-cashless-mediclaim",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/accidental-health-plan-to-protect-you-against-unusual-incidents",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/advantages-types-and-coverage-of-personal-accident-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/all-you-wanted-to-know-about-your-personal-accident-cover",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/article-listing",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/benefits-and-features-of-personal-accident-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/benefits-of-buying-personal-accident-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/benefits-of-personal-accident-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/does-the-policy-cover-hospitalization-expenses-incurred-after-an-accident",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/faq",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/i-am-a-homemaker-and-i-spend-a-majority-of-my-time-at-home-do-i-also-need-an-individual-personal-accident-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/i-have-a-dependent-family-to-support-and-i-am-the-only-bread-winner-does-the-individual-personal-accident-policy-cover-death",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/i-have-a-ready-bought-a-health-and-life-insurance-cover-why-should-i-also-buy-an-individual-personal-accident-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/important-things-to-know-on-accidental-insurance-for-senior-citizens",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/is-an-individual-personal-accident-policy-necessary-if-i-am-a-homemaker",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/looking-for-accidental-insurance-important-things-you-must-know",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/things-not-covered-under-personal-accident-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/what-are-the-tax-implications-of-personal-accident-insurance",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/what-is-an-individual-personal-accident-policy",
"https://www.iffcotokio.co.in/health-insurance/individual-personal-accident-policy/why-it-makes-sense-to-have-personal-accident-cover",
"https://www.iffcotokio.co.in/health-insurance/invest-in-right-health-insurance-policy-and-save-taxes",
"https://www.iffcotokio.co.in/health-insurance/is-a-medical-checkup-necessary-before-buying-a-policy",
"https://www.iffcotokio.co.in/health-insurance/is-health-insurance-the-same-as-life-insurance",
"https://www.iffcotokio.co.in/health-insurance/is-it-safe-to-buy-health-insurance-online",
"https://www.iffcotokio.co.in/health-insurance/is-it-true-that-for-the-policy-to-be-applicable-the-hospitalization-time-needs-to-be-more-than-24-hours",
"https://www.iffcotokio.co.in/health-insurance/is-maternity-covered-in-health-insurance-policies",
"https://www.iffcotokio.co.in/health-insurance/is-mediclaim-the-same-as-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/is-there-any-tax-benefit-that-one-can-avail-of-while-purchasing-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/key-things-to-know-about-cashless-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/know-why-cashless-claim-in-health-insurance-is-important",
"https://www.iffcotokio.co.in/health-insurance/life-and-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/life-insurance-and-health-insurance-are-complementary-not-alternatives",
"https://www.iffcotokio.co.in/health-insurance/more-awareness-needed-among-indians-with-regards-to-buying-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy/faq",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy/how-many-and-what-types-of-vector-borne-diseases-does-the-mos-bite-protector-policy-covers",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy/should-i-have-a-mosquito-insurance-plan-if-i-already-have-regular-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy/what-exactly-are-vector-borne-diseases",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy/what-is-the-cancellation-policy-for-the-mos-bite-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy/what-is-the-claim-raising-procedure-for-the-mos-bite-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/mos-bite-protector-policy/who-should-buy-the-mos-bite-protector-policy",
"https://www.iffcotokio.co.in/health-insurance/my-employer-provides-me-with-health-insurance-coverage-is-it-advisable-to-take-another-policy-on-my-own",
"https://www.iffcotokio.co.in/health-insurance/my-wife-and-children-are-residing-at-mysore-while-i-am-here-in-bangalore-can-i-cover-all-of-us-in-one-health-policy",
"https://www.iffcotokio.co.in/health-insurance/network-hospital-quality-parameters",
"https://www.iffcotokio.co.in/health-insurance/network-hospitals-in-health-insurance-what-to-look-for",
"https://www.iffcotokio.co.in/health-insurance/nine-ways-to-reduce-your-risk-of-cancer",
"https://www.iffcotokio.co.in/health-insurance/our-underwriting-philosophy-for-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/questions-to-ask-when-buying-or-renewing-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/reinstatement-of-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/reviews",
"https://www.iffcotokio.co.in/health-insurance/revisiting-your-health-insurance-needs",
"https://www.iffcotokio.co.in/health-insurance/right-age-to-buy-a-mediclaim-policy",
"https://www.iffcotokio.co.in/health-insurance/saral-suraksha-bima",
"https://www.iffcotokio.co.in/health-insurance/seven-tips-to-choose-a-health-insurance-plan-in-india",
"https://www.iffcotokio.co.in/health-insurance/should-health-insurance-be-mandatory-in-india",
"https://www.iffcotokio.co.in/health-insurance/staying-healthy-and-hearty-this-winter",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/article-listing",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/can-this-insurance-policy-be-cancelled-by-iffco-tokio",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/does-this-health-insurance-plan-cover-maternity-expenses",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/how-many-family-members-does-this-plan-cover",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/key-benefits-of-iffco-tokio-swasthya-kavach-policy",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/what-are-add-on-covers",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/what-do-you-mean-by-sub-limit",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/what-is-domiciliary-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/swasthya-kavach-policy/what-is-waiting-period",
"https://www.iffcotokio.co.in/health-insurance/swasthya-raksha-bima",
"https://www.iffcotokio.co.in/health-insurance/ten-questions-to-ask-before-you-buy-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/the-affordability-of-health-insurance-in-india",
"https://www.iffcotokio.co.in/health-insurance/the-essentials-of-buying-health-insurance-online",
"https://www.iffcotokio.co.in/health-insurance/the-right-process-to-buy-health-insurance-online",
"https://www.iffcotokio.co.in/health-insurance/things-to-know-about-waiting-period-in-health-insurance-policies",
"https://www.iffcotokio.co.in/health-insurance/things-to-know-before-buying-health-insurance-in-india",
"https://www.iffcotokio.co.in/health-insurance/things-usually-excluded-from-mediclaim-policy",
"https://www.iffcotokio.co.in/health-insurance/tips-for-buying-mediclaim-policy",
"https://www.iffcotokio.co.in/health-insurance/tips-to-reduce-the-cost-of-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/top-5-myths-about-senior-citizen-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/types-of-health-insurance-plans",
"https://www.iffcotokio.co.in/health-insurance/types-of-health-insurance-policies",
"https://www.iffcotokio.co.in/health-insurance/ways-in-which-budget-2018-can-benefit-health-insurance-policy-holders",
"https://www.iffcotokio.co.in/health-insurance/ways-to-buy-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-benefits-of-having-a-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-documents-required-for-buying-a-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-factors-which-determine-the-premium-payable-for-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-features-of-the-new-standard-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-first-year-or-second-year-exclusions",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-minimum-and-maximum-health-insurance-policy-durations",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-things-to-look-for-while-choosing-a-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/what-are-the-types-of-health-insurance-plans-in-india",
"https://www.iffcotokio.co.in/health-insurance/what-can-your-health-insurance-plan-do-for-you",
"https://www.iffcotokio.co.in/health-insurance/what-do-you-mean-by-cashless-hospitalization",
"https://www.iffcotokio.co.in/health-insurance/what-do-you-mean-by-waiting-period-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-does-mos-bite-policy-cover-and-how-is-it-unique",
"https://www.iffcotokio.co.in/health-insurance/what-does-your-health-insurance-policy-cover",
"https://www.iffcotokio.co.in/health-insurance/what-happens-to-the-health-insurance-policy-coverage-after-a-claim-is-filed",
"https://www.iffcotokio.co.in/health-insurance/what-happens-when-i-cancel-the-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/what-happens-when-you-dont-renew-health-insurance-on-time",
"https://www.iffcotokio.co.in/health-insurance/what-is-a-pre-existing-condition-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-is-cancer-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/what-is-cashless-facility-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-is-covered-under-critical-illness-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-is-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-is-health-insurance-coverage-amount",
"https://www.iffcotokio.co.in/health-insurance/what-is-medical-insurance-claim-procedure-and-how-does-it-work",
"https://www.iffcotokio.co.in/health-insurance/what-is-pre-hospitalisation-and-post-hospitalisation",
"https://www.iffcotokio.co.in/health-insurance/what-is-senior-citizen-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/what-is-the-difference-between-health-insurance-critical-illness-policies-or-critical-illness-riders-in-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-is-the-eligibility-for-section-80d-deductions-under-income-tax",
"https://www.iffcotokio.co.in/health-insurance/what-is-the-maximum-number-of-health-insurance-claims-allowed-over-a-year",
"https://www.iffcotokio.co.in/health-insurance/what-is-the-process-to-buy-health-insurance-online",
"https://www.iffcotokio.co.in/health-insurance/what-is-the-process-to-claim-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-is-the-renewal-process-for-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-is-the-right-age-to-buy-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/what-will-happen-if-my-policy-lapses-when-i-am-hospitalized",
"https://www.iffcotokio.co.in/health-insurance/what-you-should-know-about-health-insurance-and-its-claims",
"https://www.iffcotokio.co.in/health-insurance/what-your-health-insurance-plan-covers",
"https://www.iffcotokio.co.in/health-insurance/when-we-buy-a-health-insurance-policy-from-your-website-do-we-receive-a-cashless-card",
"https://www.iffcotokio.co.in/health-insurance/who-is-a-third-party-administrator-in-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/who-will-receive-the-claim-amount-under-health-insurance-if-the-policyholder-dies-during-the-time-of-treatment",
"https://www.iffcotokio.co.in/health-insurance/why-a-family-health-plan-makes-a-lot-of-sense",
"https://www.iffcotokio.co.in/health-insurance/why-every-senior-citizen-must-buy-health-insurance",
"https://www.iffcotokio.co.in/health-insurance/why-health-insurance-is-important-for-you",
"https://www.iffcotokio.co.in/health-insurance/why-health-insurance-is-the-best-gift-this-diwali",
"https://www.iffcotokio.co.in/health-insurance/why-is-health-insurance-necessary",
"https://www.iffcotokio.co.in/health-insurance/why-majority-of-people-skip-buying-health-insurance-policy",
"https://www.iffcotokio.co.in/health-insurance/why-your-health-insurance-never-works-the-way-you-want-it-to",
"https://www.iffcotokio.co.in/health-insurance/why-your-parents-need-a-separate-health-insurance-plan",
"https://www.iffcotokio.co.in/health-insurance/women-and-health-insurance-time-to-empower-yourself"]

exports.allReportFunc = async (req, res, next) => {
  try {
    const { url } = req.body;
    const allUrls = await getAllUrls(url);
    const BrokenLinksReport = await BrokenLinks(allUrls);
    const h1TagReport = await h1Tags(allUrls);
    const canonicalTagReport = await Canonical(allUrls);
    const linkLoadingTimeReport = await linkLoadingTime(allUrls);

    res
      .status(200)
      .json({
        brokenLinksReport: BrokenLinksReport,
        h1TagReport: h1TagReport,
        canonicalTagReport: canonicalTagReport,
        linkLoadingTime: linkLoadingTimeReport,
      });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

exports.CanonicalReportFunc = async (req, res, next) => {
  try {
    const { url } = req.body;
    const allUrls = await getAllUrls(url);
    const canonicalTagReport = await Canonical(allUrls);

    const headerRow = Object.keys(canonicalTagReport[0]).join(",") + "\n";

    // Create the data rows
    const dataRows = canonicalTagReport
      .map((obj) => {
        return Object.values(obj).join(",") + "\n";
      })
      .join("");

    // Combine the header row and data rows into the final CSV string
    const csvString = headerRow + dataRows;

    // Write the CSV string to a file
    fs.writeFile("data.csv", csvString, (err) => {
      if (err) throw err;
      console.log("File saved!");
    });

    res.status(200).json({ canonicalTagReport: canonicalTagReport });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};
exports.h1TagReportFunc = async (req, res, next) => {
  try {
    const { url } = req.body;
    const allUrls = await getAllUrls(url);
    const h1TagReport = await h1Tags(allUrls);

    res.status(200).json({ h1TagReport: h1TagReport });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

exports.BrokenLinkReportFunc = async (req, res, next) => {
  try {
    const url = req.body;
    const allUrls = await getAllUrls(url);
    const BrokenLinksReport = await BrokenLinks(allUrls);

    res.status(200).json({ brokenLinksReport: BrokenLinksReport });
  } catch (error) {
    // res.status(500).json({"message":"internal server error"})
    console.log(error);
  }
};

exports.LoadingTimeReportFunc = async (req, res, next) => {
  try {
    const { url } = req.body;
    const allUrls = await getAllUrls(url);
    const linkLoadingTimeReport = await linkLoadingTime(allUrls);

    res.status(200).json({ linkLoadingTime: linkLoadingTimeReport });
  } catch (error) {
    // res.status(500).json({"message":"internal server error"})
    console.log(error);
  }
};

exports.Canonical301ReportFunc = async (req, res, next) => {
  try {
    const { url } = req.body;
    const allUrls = await getAllUrls(url);
    const Canonical301Report = await Canonical301(allUrls);

    const headerRow = Object.keys(Canonical301Report[0]).join(",") + "\n";

    // Create the data rows
    const dataRows = Canonical301Report
      .map((obj) => {
        return Object.values(obj).join(",") + "\n";
      })
      .join("");

    // Combine the header row and data rows into the final CSV string
    const csvString = headerRow + dataRows;

    // Write the CSV string to a file
    fs.writeFile("tata.csv", csvString, (err) => {
      if (err) throw err;
      console.log("File saved!");
    });

    res.status(200).json({ Canonical301: Canonical301Report });
  } catch (error) {
    // res.status(500).json({"message":"internal server error"})
    console.log(error);
  }
};

exports.FindWordReportFunc = async (req, res, next) => {
  try {
    const { word } = req.body;

    const searchWordInWebPagesReport = await searchWordInWebPages(word, arrayOfLink)

    res.status(200).json({ searchWordInWebPagesReport: searchWordInWebPagesReport });
  } catch (error) {
    // res.status(500).json({"message":"internal server error"})
    console.log(error);
  }
};