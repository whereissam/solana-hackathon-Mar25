# Image Guidelines for Unify Giving

## Banner Images

Banner images are used across the site for page headers and should follow these guidelines:

### Directory Structure

All banner images should be placed in the public directory with the following structure:

```
public/
  images/
    contact/
      contactBanner.jpg    # Main contact page banner
      contactBanner2.jpg   # Alternative contact page banner
    about/
      ourstory.jpg
      partner.jpg
      ...
    charities/
      ...
    category/
      ...
    ...
```

### Image Specifications

- **Format**: JPG or PNG (JPG preferred for photographs)
- **Dimensions**: 1440px × 500px (minimum width)
- **Aspect Ratio**: Landscape orientation (approximately 3:1)
- **File Size**: Optimize images to be under 300KB when possible

### How to Update Banner Images

#### Option 1: Direct Replacement

The simplest way to update a banner image is to replace the existing file in the public directory while keeping the same filename.

For example, to update the Contact page banner:
1. Prepare your new image with appropriate dimensions
2. Name it `contactBanner.jpg`
3. Replace the existing file at `/public/images/contact/contactBanner.jpg`

#### Option 2: Code Update

If you want to use a different image without replacing the existing file:

1. Add your new image to the appropriate directory in `/public/images/`
2. Update the image path in the page component

For the Contact page, modify the path in `src/pages/contact/index.tsx`:

```tsx
// Change this line
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url('/images/contact/contactBanner.jpg')`,
  }}
></div>

// To use a different image
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url('/images/contact/contactBanner2.jpg')`,
  }}
></div>
```

### Using the BannerImage Component

For consistent banner styling across the site, use the `BannerImage` component:

```tsx
import BannerImage from '@/components/common/BannerImage';

// In your page component
<BannerImage
  title="Contact Us"
  subtitle="We're here to help you connect with causes that matter."
  imagePath="/images/contact/contactBanner.jpg"
/>
```

This component handles the gradient overlay and responsive text styling automatically.

## Hero Images

Hero images for specific sections should follow the same directory structure pattern, organized by page or section name.

## Category and Charity Images

These images are stored in:
- `/public/images/category/` - For category thumbnails
- `/public/images/charities/` - For charity organization thumbnails

## Profile Images

Team member profile images are stored in `/public/images/about/` with the person's name as the filename (e.g., `emma.jpg`).

## Best Practices

1. Always optimize images before adding them to the project
2. Maintain consistent aspect ratios within each image category
3. Use descriptive filenames that indicate the content
4. Consider accessibility by avoiding images with text that's critical to understanding the content
5. Test how images appear on different screen sizes