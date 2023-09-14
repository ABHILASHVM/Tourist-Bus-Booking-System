const testimonials =[
{
    name:"John Doe",
    image:"/css/images/icons/usericon.png",
    testimonial:"I had an amazing experience with this bus booking agency. The buses were clean and comfortable, and the driver was friendly and professional. I would definitely book with them again."
},
{
    name:"Jane Doe",
    image:"/css/images/icons/usericon.png",
    testimonial:"I highly recommend this bus booking agency to anyone looking for a comfortable and convenient way to explore new destinations. The staff is friendly and knowledgeable, and the buses are top-notch."
},
{
    name:"Mike Smith",
    image:"/css/images/icons/usericon.png",
    testimonial:"I had a great time on my bus tour with this agency. The itinerary was well-planned and the accommodations were excellent. I would definitely travel with them again."
}
];
let i = 0;
//Total Slides
let j = testimonials.length;
let testimonialContainer = document.getElementById("testimonial-container");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
nextBtn.addEventListener("click", () => {
  i = (j + i + 1) % j;
  displayTestimonial();
});
prevBtn.addEventListener("click", () => {
  i = (j + i - 1) % j;
  displayTestimonial();
});
let displayTestimonial = () => {
  testimonialContainer.innerHTML = `
    <p>${testimonials[i].testimonial}</p>
    <img src=${testimonials[i].image}>
    <h3>${testimonials[i].name}</h3>
  `;
};
window.onload = displayTestimonial;

function toggleAnswer(faqId) {
    var answer = document.getElementById("answer" + faqId);
    var question = document.getElementById("question" + faqId);
var plusMinus = question.querySelector("span:last-child");  if (answer.style.display === "none") {
  answer.style.display = "block";
  plusMinus.textContent = "-";
} else {
  answer.style.display = "none";
  plusMinus.textContent = "+";
}
}

