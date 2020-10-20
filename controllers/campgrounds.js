const Campground = require('../models/campground');

// Get all posts
module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};

// Get a new post form
module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new');
};

// Create a new post
module.exports.createCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  req.flash('success', 'Successfully made a new campground!!');
  res.redirect(`/campgrounds/${campground._id}`);
};

// Get a post
module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('author');
  if (!campground) {
    req.flash('error', 'Cannot found a campground...');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
};

// Get a edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash('error', 'Cannot found a campground...');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
};

// Update a post
module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash('success', 'Successfully updated a campground!!');
  res.redirect(`/campgrounds/${campground._id}`);
};

// Delete post
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted a campground...');
  res.redirect('/campgrounds');
};
