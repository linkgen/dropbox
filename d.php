<?php
// Retrieve the URL from the 'c' parameter in the URL string
$cParam = isset($_GET['c']) ? $_GET['c'] : null;

if (!$cParam) {
    // Redirect to Google.com if 'c' parameter is not provided
    header("Location: https://www.google.com");
    exit();
}

// Concatenate the prefix, 'c' parameter, and "&dl=1"
$url = 'https://www.dropbox.com/scl/fi/' . urldecode($cParam) . '&dl=1';

$options = [
    'http' => [
        'method' => 'GET',
        'follow_location' => false,  // Disable automatic redirects
        'header' => 'User-Agent: Mozilla/5.0',  // Provide a user agent
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// Get response headers
$responseHeaders = $http_response_header;

// Extract the Location header if it exists
$redirectUrl = null;
foreach ($responseHeaders as $header) {
    if (strpos($header, 'Location: ') === 0) {
        $redirectUrl = trim(substr($header, 10));
        break;
    }
}

// If a redirect URL is found, redirect the user
if ($redirectUrl) {
    header("Location: $redirectUrl");
    exit();
} else {
    echo "No Location header found.";
}
?>
