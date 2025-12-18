# Direct File Upload Implementation

## Overview
Replaced Google Drive URL upload with direct file upload from device, using Supabase Storage for secure file storage.

## Changes Made

### 1. Supabase Storage Setup
- ✅ Created `recordings` storage bucket
- ✅ Set file size limit to 100MB
- ✅ Configured allowed MIME types:
  - Audio: MP3, WAV, M4A, OGG, WEBM, FLAC
  - Video: MP4, WEBM
- ✅ Implemented Row-Level Security policies:
  - Users can upload their own recordings
  - Users can read their own recordings
  - Users can delete their own recordings

### 2. AddRecordingModal Component Updates

#### Removed Features
- Google Drive URL input field
- Google Drive URL validation functions
- Drive link accessibility checks
- `drive_file_id` extraction

#### Added Features
- **File Input**: Direct file picker with drag-and-drop support
- **File Validation**: 
  - File type validation (audio/video formats only)
  - File size validation (max 100MB)
  - Automatic extension checking
- **Upload Progress**: Visual progress bar during upload
- **Auto-naming**: Automatically populates recording name from filename
- **File Preview**: Shows selected file name and size

#### New State Management
```typescript
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [uploadProgress, setUploadProgress] = useState(0);
```

#### Upload Flow
1. User selects audio/video file from device
2. File validation (type and size)
3. Check for unique recording name
4. Upload file to Supabase Storage (`recordings` bucket)
5. Store file metadata in `recordings` table
6. Create analysis record
7. Trigger webhook for processing
8. Show success notification

### 3. Storage Path Structure
Files are stored in the following path format:
```
recordings/
  └── {user_id}/
      └── {timestamp}_{recording_name}.{extension}
```

Example: `recordings/abc-123/1702900000000_sales_call.mp3`

### 4. Database Changes
The `recordings` table now uses:
- `stored_file_url`: Supabase Storage public URL
- `file_size`: Actual file size in bytes
- `status`: Set to 'uploaded' initially
- `drive_file_id`: Now optional/deprecated

### 5. UI/UX Improvements
- Clear file selection indicator with icon
- Real-time file size display
- Upload progress indicator
- Better error messages
- Updated dialog descriptions

### 6. Landing Page Updates
Updated feature descriptions to reflect direct upload capability:
- Changed "Upload from Google Drive" to "Upload from your device"
- Emphasized secure cloud storage

## Benefits

### For Users
- ✅ No need to upload to Google Drive first
- ✅ Direct upload from any device
- ✅ Faster workflow (fewer steps)
- ✅ Better privacy control
- ✅ Works offline preparation

### For System
- ✅ Centralized storage in Supabase
- ✅ Better file access control
- ✅ Automatic authentication
- ✅ No external dependencies (Google Drive API)
- ✅ Consistent file availability

## Technical Details

### File Upload Implementation
```typescript
const { data: uploadData, error: uploadError } = await supabase.storage
  .from('recordings')
  .upload(storagePath, selectedFile, {
    cacheControl: '3600',
    upsert: false,
  });
```

### Webhook Payload
The webhook now receives:
```json
{
  "url": "https://...supabase.co/storage/v1/object/public/recordings/...",
  "name": "Recording Name",
  "recording_id": "uuid",
  "analysis_id": "uuid",
  "user_id": "uuid",
  "file_size": 1234567,
  "storage_path": "user_id/timestamp_name.ext",
  "upload_method": "direct_upload"
}
```

## Security Features

### Storage Policies
- Users can only access their own files
- Authenticated access required
- File path includes user_id for isolation

### File Validation
- MIME type checking
- File size limits
- Extension verification
- Duplicate name prevention

## Testing Checklist

- [ ] Upload MP3 file
- [ ] Upload WAV file
- [ ] Upload large file (>100MB) - should fail
- [ ] Upload invalid file type - should fail
- [ ] Upload with duplicate name - should fail
- [ ] Check file appears in Supabase Storage
- [ ] Verify webhook receives correct payload
- [ ] Test progress indicator
- [ ] Check recording appears in dashboard
- [ ] Verify analysis is created

## Next Steps (Optional Enhancements)

1. **Drag & Drop**: Implement drag-and-drop file upload
2. **Multiple Files**: Allow batch upload
3. **Resume Upload**: Add resumable upload for large files
4. **Preview**: Audio player preview before upload
5. **Compression**: Client-side audio compression
6. **Metadata**: Extract audio duration before upload
7. **Thumbnails**: Generate waveform thumbnails

## Migration Notes

### Backward Compatibility
- Old recordings with `drive_file_id` remain accessible
- `drive_file_id` field kept in schema for existing data
- System handles both storage methods seamlessly

### User Communication
Users should be informed that:
- New uploads are now direct from device
- Files are securely stored in cloud
- Existing recordings are unaffected
