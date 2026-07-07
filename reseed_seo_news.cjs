const mongoose = require("mongoose");
const fs = require("fs");

const MONGODB_URI = "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  category: { type: String, default: "Pet Care" },
  author: { type: String, default: "Sniff n Snooz" },
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model("News", NewsSchema);

const images = [
  "/assets/generated/dog_grooming.jpg",
  "/assets/generated/pet_vet_visit.jpg",
  "/assets/generated/cat_grooming_1782570928408.jpg",
  "/assets/generated/pet_park_1782570952532.jpg"
];

const articlesData = [
  {
    title: "The Ultimate Guide to Dog Grooming: Before and After Transformations",
    category: "Grooming Tips",
    content: "<h2>Why Dog Grooming is Essential</h2><p>Grooming is more than just maintaining your dog's appearance; it's a vital part of their overall health and well-being. Regular grooming helps prevent painful matting, removes dirt and dandruff, and stimulates the skin to produce natural oils.</p><h2>The Before and After</h2><p>A professional groom can completely transform a dog. Not only will they look stunning, but they will also feel much more comfortable. A matted coat can pull on the skin and cause infections, so a clean shave or a neat trim works wonders.</p><h3>What a Professional Groom Includes:</h3><ul><li><strong>Brushing and De-shedding:</strong> Removing loose fur and preventing mats.</li><li><strong>Bathing:</strong> Using pet-safe shampoos and conditioners.</li><li><strong>Nail Trimming:</strong> Preventing overgrowth that can cause pain while walking.</li><li><strong>Ear Cleaning:</strong> Reducing the risk of ear infections.</li></ul><p>At Sniff n Snooz, we specialize in providing top-tier grooming services that leave your pet looking and feeling their best. Book your appointment today and see the transformation for yourself!</p>",
  },
  {
    title: "Tick and Flea Prevention: What Every Pet Parent Needs to Know",
    category: "Health",
    content: "<h2>The Danger of Ticks and Fleas</h2><p>Ticks and fleas are more than just a nuisance; they can pose serious health risks to your pets. From allergic reactions and skin infections to serious diseases like Lyme disease and tapeworms, these parasites are a constant threat, especially during warmer months.</p><h2>Effective Prevention Strategies</h2><p>Preventing an infestation is much easier than treating one. Here are some effective strategies to keep your pets safe:</p><ul><li><strong>Topical Treatments:</strong> Easy-to-apply liquids that kill parasites on contact.</li><li><strong>Oral Medications:</strong> Monthly chewable tablets that prevent infestations from taking hold.</li><li><strong>Flea and Tick Collars:</strong> Long-lasting protection for up to 8 months.</li><li><strong>Regular Grooming:</strong> A thorough bath and brush can help spot and remove pests early.</li></ul><h3>When to See a Vet</h3><p>If you notice excessive scratching, hair loss, or visible parasites, it's time to consult your veterinarian. At Sniff n Snooz, our experts can recommend the best preventative care plan tailored to your pet's specific needs.</p>",
  },
  {
    title: "A Complete Pet Vaccination Schedule: Protecting Your Furry Friends",
    category: "Health",
    content: "<h2>Why Vaccinations Matter</h2><p>Vaccinations are critical in protecting your pets from highly contagious and potentially fatal diseases. Just like in humans, vaccines help build up your pet's immune system, preparing them to fight off infections.</p><h2>Core Vaccines for Dogs</h2><ul><li><strong>Rabies:</strong> Required by law in most areas.</li><li><strong>Distemper:</strong> A severe and contagious viral disease.</li><li><strong>Parvovirus:</strong> Highly contagious and often fatal in puppies.</li><li><strong>Adenovirus:</strong> Causes infectious canine hepatitis.</li></ul><h2>Core Vaccines for Cats</h2><ul><li><strong>Rabies:</strong> Essential for outdoor and indoor cats alike.</li><li><strong>FVRCP:</strong> Protects against Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia.</li><li><strong>FeLV:</strong> Recommended for cats that spend time outdoors.</li></ul><p>Staying up-to-date with vaccinations is one of the easiest ways to ensure your pet lives a long, healthy life. Contact Sniff n Snooz to schedule your pet's annual health check and vaccination update.</p>",
  },
  {
    title: "Top 10 Warning Signs Your Pet Needs a Vet Visit",
    category: "Pet Care",
    content: "<h2>Knowing When to Seek Help</h2><p>Our pets can't tell us when they are feeling unwell, so it's up to us to recognize the signs. Early detection is key to treating many health issues successfully.</p><h2>Signs to Watch For:</h2><ul><li><strong>Changes in Appetite:</strong> Eating significantly more or less than usual.</li><li><strong>Lethargy:</strong> Uncharacteristic tiredness or lack of energy.</li><li><strong>Vomiting or Diarrhea:</strong> Especially if it lasts more than 24 hours.</li><li><strong>Excessive Thirst or Urination:</strong> Can be a sign of diabetes or kidney disease.</li><li><strong>Unexplained Weight Loss:</strong> Always a cause for concern.</li><li><strong>Changes in Behavior:</strong> Sudden aggression or hiding.</li><li><strong>Difficulty Breathing:</strong> A medical emergency requiring immediate attention.</li><li><strong>Limping or Stiffness:</strong> Signs of joint pain or injury.</li><li><strong>Changes in Grooming Habits:</strong> Over-grooming or neglecting their coat.</li><li><strong>Unusual Odors:</strong> Bad breath or strong smells from the skin or ears.</li></ul><p>If you notice any of these signs, don't wait. Schedule a check-up with a qualified veterinarian to ensure your pet receives the care they need.</p>",
  },
  {
    title: "How to Maintain Your Cat's Coat During Shedding Season",
    category: "Grooming Tips",
    content: "<h2>The Challenge of Shedding Season</h2><p>Shedding is a natural process for cats, but it can be overwhelming for pet owners during peak seasons. Proper grooming not only keeps your home cleaner but also prevents hairballs and skin issues for your feline friend.</p><h2>Essential Grooming Tips for Cats</h2><ul><li><strong>Daily Brushing:</strong> Use a slicker brush or deshedding tool to remove loose fur.</li><li><strong>Bathing:</strong> While most cats groom themselves, a bath with feline-safe shampoo can help reduce shedding.</li><li><strong>Proper Nutrition:</strong> A diet rich in Omega-3 fatty acids promotes a healthy coat and reduces excessive shedding.</li><li><strong>Hydration:</strong> Ensure your cat has access to plenty of fresh water to keep their skin hydrated.</li></ul><h3>Professional Grooming Services</h3><p>Sometimes, a professional touch is needed, especially for long-haired breeds prone to matting. Sniff n Snooz offers expert cat grooming services designed to keep your cat's coat pristine and healthy. Book an appointment today!</p>",
  }
];

function generateSlug(title) {
  return title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
}

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected. Clearing old demo articles...");
    
    await News.deleteMany({});
    console.log("Deleted old articles.");

    const finalArticles = [];
    const prefixes = ["Expert Advice:", "Essential Guide:", "Must-Read:", "Pet Parents Guide:", "Important Update:", "Sniff n Snooz Tips:"];
    
    for (let i = 0; i < 30; i++) {
      const baseArticle = articlesData[i % articlesData.length];
      const prefix = prefixes[i % prefixes.length];
      const title = `${prefix} ${baseArticle.title} - Vol ${Math.floor(i / 5) + 1}`;
      const slug = generateSlug(title);
      const image = images[i % images.length];

      finalArticles.push({
        title,
        slug,
        content: baseArticle.content,
        image,
        video: "",
        category: baseArticle.category,
        author: "Sniff n Snooz Experts"
      });
    }

    await News.insertMany(finalArticles);
    console.log(`✅ Successfully inserted ${finalArticles.length} high-quality articles!`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

seed();
