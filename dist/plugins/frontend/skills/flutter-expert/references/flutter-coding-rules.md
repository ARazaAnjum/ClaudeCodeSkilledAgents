# Flutter Coding Rules

## Core Flutter Rules

## Pre-Response Checklist

Before providing any response, automatically verify:

1. **Colors**: Are ALL colors from theme.colorScheme.* ONLY?
2. **Spacing**: Are ALL spacing values from AppSpacing.* constants ONLY?
3. **Typography**: Are ALL text styles from theme.textTheme.* ONLY and NO italic unless explicitly requested?
4. **Strings**: Are ALL strings from AppLocalizations.of(context) ONLY?
5. **Assets**: Are ALL assets through defined constants ONLY?
6. **Components**: Are common widgets from lib/ui/common/ used ONLY?
7. **Theming**: Is proper light/dark theme support implemented and NO custom styling/overrides used?
8. **Accessibility**: Are semantic labels and accessibility included?
9. **Hardcoded Values**: Are there ZERO hardcoded values anywhere?
10. **Localization**: Are there ZERO hardcoded strings anywhere?
11. **Component Sizing**: Are ALL components using LARGE as default size?
12. **Widget Spacing**: Are ALL widgets spaced with AppSpacing.spaceM or AppSpacing.spaceL?
13. **Strict Theme Compliance**: Are ALL colors from theme.colorScheme.* and ALL text from theme.textTheme.* with NO modifications?
14. **Dimension Constants**: Are ALL UI properties (width, height, fontSize, letterSpacing, lineHeight, decorationThickness, maxLines, alpha) from AppDimensions.* constants ONLY?
15. **SizedBox Constants**: Are ALL SizedBox dimensions from AppDimensions.* or AppSpacing.* constants ONLY?
16. **Container Constants**: Are ALL Container dimensions from AppDimensions.* constants ONLY?
17. **No Hardcoded Dimensions**: Are there ZERO hardcoded numeric values for any UI properties?

IF ANY CHECK FAILS, REJECT THE REQUEST AND EXPLAIN THE VIOLATION.

---

## Absolute Design System Requirements - Zero Tolerance

Automatic enforcement for every single interaction:

- **Zero Hardcoded Colors**: NO Color(0xFF...), NO Colors.blue, NO direct hex values - ONLY theme.colorScheme.*
- **Zero Hardcoded Spacing**: NO EdgeInsets.all(16.0), NO SizedBox(height: 12) - ONLY AppSpacing.* constants
- **Zero Hardcoded Typography**: NO TextStyle(fontSize: 16.0), NO hardcoded font weights - ONLY theme.textTheme.*
- **Zero Italic Styles**: NO fontStyle: FontStyle.italic UNLESS user explicitly requests "use italic"
- **Zero Hardcoded Strings**: NO Text('Hello'), NO string literals - ONLY AppLocalizations.of(context)
- **Zero Direct Assets**: NO 'assets/images/logo.png' - ONLY AppImages.* constants
- **Zero Custom Components**: NO custom widgets - ONLY lib/ui/common/ components
- **Zero Theme Violations**: ALL components MUST support light/dark themes - NO exceptions
- **Zero Accessibility Violations**: ALL components MUST have semantic labels
- **Mandatory Large Sizing**: ALL components MUST use LARGE as default size unless specifically required otherwise
- **Mandatory Consistent Spacing**: ALL widgets MUST be spaced with AppSpacing.spaceM (12px) or AppSpacing.spaceL (16px)
- **Mandatory Strict Theme Compliance**: ALL styling MUST come from theme system ONLY - NO custom styling, NO overrides, NO exceptions
- **Zero Hardcoded Dimensions**: NO hardcoded width, height, fontSize, letterSpacing, lineHeight, decorationThickness, maxLines, alpha values - ONLY AppDimensions.* constants
- **Mandatory Dimension Constants**: ALL UI properties MUST use centralized constants from AppDimensions.* or AppSpacing.*

---

## Consistent Sizing and Spacing Rules

### Mandatory Component Sizing Standards

ALL components MUST use LARGE as default size for consistency.

#### Required Default Sizing Patterns:
```dart
// CORRECT - Default LARGE sizing for all components
AppButton(
  size: AppButtonSize.large,  // MANDATORY DEFAULT
  onPressed: _handleAction,
  child: Text(l10n.submit),
)

// CORRECT - Default LARGE sizing for text inputs
AppTextInput(
  size: AppTextInputSize.large,  // MANDATORY DEFAULT
  label: l10n.emailAddress,
  controller: _emailController,
)

// CORRECT - Default LARGE sizing for dropdowns
CountryDropdown(
  size: AppDropdownSize.large,  // MANDATORY DEFAULT
  label: l10n.selectCountry,
  selectedCountry: _selectedCountry,
)

// CORRECT - Default LARGE sizing for icon buttons
IconButton(
  iconSize: 32.0,  // LARGE default size
  onPressed: _handleAction,
  icon: Icon(Icons.settings),
)
```

#### Forbidden Sizing Patterns:
```dart
// FORBIDDEN - Using small or medium when large is default
AppButton(
  size: AppButtonSize.small,  // FORBIDDEN unless specifically required
  onPressed: _handleAction,
  child: Text(l10n.submit),
)

// FORBIDDEN - No size specified (must be explicit)
AppButton(
  onPressed: _handleAction,
  child: Text(l10n.submit),
)

// FORBIDDEN - Inconsistent icon sizes
IconButton(
  iconSize: 16.0,  // TOO SMALL - use 32.0 for large
  onPressed: _handleAction,
  icon: Icon(Icons.settings),
)
```

### Mandatory Spacing Standards

ALL widgets MUST use AppSpacing.spaceM (12px) or AppSpacing.spaceL (16px) for consistency.

#### Required Spacing Patterns:
```dart
// CORRECT - spaceM (12px) between related elements
Column(
  children: [
    AppButton(size: AppButtonSize.large, child: Text(l10n.primary)),
    SizedBox(height: AppSpacing.spaceM),  // 12px between buttons
    AppButton(size: AppButtonSize.large, child: Text(l10n.secondary)),
    SizedBox(height: AppSpacing.spaceM),  // 12px between buttons
    AppTextInput(size: AppTextInputSize.large, label: l10n.email),
  ],
)

// CORRECT - spaceL (16px) for screen padding and section spacing
Padding(
  padding: EdgeInsets.all(AppSpacing.spaceL),  // 16px screen padding
  child: Column(
    children: [
      Text(l10n.title, style: theme.textTheme.headlineLarge),
      SizedBox(height: AppSpacing.spaceL),  // 16px section spacing
      Card(
        child: Padding(
          padding: EdgeInsets.all(AppSpacing.spaceL),  // 16px card padding
          child: Column(
            children: [
              AppTextInput(size: AppTextInputSize.large, label: l10n.name),
              SizedBox(height: AppSpacing.spaceM),  // 12px between inputs
              AppTextInput(size: AppTextInputSize.large, label: l10n.email),
            ],
          ),
        ),
      ),
    ],
  ),
)

// CORRECT - Row spacing with spaceM
Row(
  children: [
    AppButton(size: AppButtonSize.large, child: Text(l10n.cancel)),
    SizedBox(width: AppSpacing.spaceM),  // 12px between buttons
    AppButton(size: AppButtonSize.large, child: Text(l10n.submit)),
  ],
)
```

#### Forbidden Spacing Patterns:
```dart
// FORBIDDEN - Using other spacing values
Column(
  children: [
    AppButton(child: Text(l10n.button1)),
    SizedBox(height: AppSpacing.spaceS),    // FORBIDDEN - use spaceM
    SizedBox(height: AppSpacing.spaceXL),   // FORBIDDEN - use spaceM or spaceL
    SizedBox(height: 8.0),                  // FORBIDDEN - hardcoded value
    AppButton(child: Text(l10n.button2)),
  ],
)

// FORBIDDEN - Inconsistent padding
Padding(
  padding: EdgeInsets.all(8.0),  // FORBIDDEN - use AppSpacing.spaceL
  child: Container(),
)
```

### Component Size Specifications

#### AppButton Sizes:
```dart
enum AppButtonSize {
  large,    // DEFAULT - height: 56px, padding: 24px horizontal
  medium,   // ONLY when specifically required - height: 48px, padding: 20px horizontal
  small,    // ONLY when specifically required - height: 40px, padding: 16px horizontal
}

// REQUIRED - Default usage
AppButton(
  size: AppButtonSize.large,  // MANDATORY DEFAULT
  child: Text(l10n.submit),
)
```

#### AppTextInput Sizes:
```dart
enum AppTextInputSize {
  large,    // DEFAULT - height: 56px, text: 18px
  medium,   // ONLY when specifically required - height: 48px, text: 16px
  small,    // ONLY when specifically required - height: 40px, text: 14px
}

// REQUIRED - Default usage
AppTextInput(
  size: AppTextInputSize.large,  // MANDATORY DEFAULT
  label: l10n.emailAddress,
)
```

#### IconButton Sizes:
```dart
// REQUIRED - Large icon size (32px) as default
IconButton(
  iconSize: 32.0,        // LARGE default
  onPressed: _handleTap,
  icon: Icon(Icons.settings),
)

// REQUIRED - Medium icon size (24px) only when specifically needed
IconButton(
  iconSize: 24.0,        // MEDIUM - only when required
  onPressed: _handleTap,
  icon: Icon(Icons.close),
)

// FORBIDDEN - Small icon sizes unless absolutely necessary
IconButton(
  iconSize: 16.0,        // FORBIDDEN - too small
  onPressed: _handleTap,
  icon: Icon(Icons.info),
)
```

### Spacing Usage Guidelines

#### When to Use AppSpacing.spaceM (12px):
- Between related UI elements (buttons, inputs, list items)
- Between form fields in the same section
- Between icon and text in buttons
- Between cards or list items
- Vertical spacing in dense layouts

#### When to Use AppSpacing.spaceL (16px):
- Screen edge padding (left, right, top, bottom)
- Between major sections on a screen
- Card internal padding
- Between header and content
- Between different functional groups

#### Required Consistent Spacing Example:
```dart
// CORRECT - Complete screen with consistent sizing and spacing
class ExampleScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.screenTitle),
        actions: [
          IconButton(
            iconSize: 32.0,  // LARGE default
            onPressed: _handleSettings,
            icon: Icon(Icons.settings),
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(AppSpacing.spaceL),  // 16px screen padding
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              l10n.welcome,
              style: theme.textTheme.headlineLarge,
            ),
            SizedBox(height: AppSpacing.spaceL),  // 16px section spacing

            Card(
              child: Padding(
                padding: EdgeInsets.all(AppSpacing.spaceL),  // 16px card padding
                child: Column(
                  children: [
                    AppTextInput(
                      size: AppTextInputSize.large,  // LARGE default
                      label: l10n.emailAddress,
                      controller: _emailController,
                    ),
                    SizedBox(height: AppSpacing.spaceM),  // 12px between inputs
                    AppTextInput(
                      size: AppTextInputSize.large,  // LARGE default
                      label: l10n.password,
                      controller: _passwordController,
                      obscureText: true,
                    ),
                  ],
                ),
              ),
            ),

            SizedBox(height: AppSpacing.spaceL),  // 16px section spacing

            Row(
              children: [
                Expanded(
                  child: AppButton(
                    size: AppButtonSize.large,  // LARGE default
                    variant: AppButtonVariant.outlined,
                    onPressed: _handleCancel,
                    child: Text(l10n.cancel),
                  ),
                ),
                SizedBox(width: AppSpacing.spaceM),  // 12px between buttons
                Expanded(
                  child: AppButton(
                    size: AppButtonSize.large,  // LARGE default
                    variant: AppButtonVariant.primary,
                    onPressed: _handleSubmit,
                    child: Text(l10n.submit),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

### Sizing and Spacing Compliance Verification

MUST VERIFY:
1. ALL AppButton components use `size: AppButtonSize.large` by default
2. ALL AppTextInput components use `size: AppTextInputSize.large` by default
3. ALL IconButton components use `iconSize: 32.0` by default
4. ALL widgets are spaced with `AppSpacing.spaceM` or `AppSpacing.spaceL` ONLY
5. ALL screen padding uses `AppSpacing.spaceL`
6. ALL between-element spacing uses `AppSpacing.spaceM`
7. NO hardcoded sizes or spacing values anywhere
8. NO small/medium sizes unless specifically justified

---

## Color System Rules

### Mandatory Color Usage Rules

Use ONLY theme colors. NO hardcoded color values allowed anywhere.

#### Required Color Usage Patterns:
```dart
// CORRECT - Primary colors
color: theme.colorScheme.primary
color: theme.colorScheme.onPrimary
color: theme.colorScheme.primaryContainer
color: theme.colorScheme.onPrimaryContainer

// CORRECT - Secondary colors
color: theme.colorScheme.secondary
color: theme.colorScheme.onSecondary
color: theme.colorScheme.secondaryContainer
color: theme.colorScheme.onSecondaryContainer

// CORRECT - Surface colors
color: theme.colorScheme.surface
color: theme.colorScheme.onSurface
color: theme.colorScheme.surfaceVariant
color: theme.colorScheme.onSurfaceVariant

// CORRECT - Error colors
color: theme.colorScheme.error
color: theme.colorScheme.onError
color: theme.colorScheme.errorContainer
color: theme.colorScheme.onErrorContainer

// CORRECT - Success colors (via extension)
color: theme.colorScheme.success
color: theme.colorScheme.onSuccess
color: theme.colorScheme.successContainer
color: theme.colorScheme.onSuccessContainer

// CORRECT - Outline colors
color: theme.colorScheme.outline
color: theme.colorScheme.outlineVariant
color: theme.colorScheme.shadow
color: theme.colorScheme.scrim
```

#### Forbidden Color Patterns:
```dart
// FORBIDDEN - Hardcoded hex colors
color: Color(0xFF7F56D9)
color: Color.fromRGBO(127, 86, 217, 1.0)
color: Color.fromARGB(255, 127, 86, 217)

// FORBIDDEN - Material colors
color: Colors.blue
color: Colors.red.shade600
color: Colors.purple[400]
color: MaterialColor(0xFF9C27B0, {})

// FORBIDDEN - Direct AppColors usage in UI
color: AppColors.brand600
color: AppColors.success500
color: AppColors.error400

// FORBIDDEN - Hardcoded color strings
color: Color(0xFFFFFFFF)
color: Color(0xFF000000)
backgroundColor: Colors.white
```

#### Color Compliance Verification:
ALL colors MUST be from theme.colorScheme.* ONLY

---

## Spacing System Rules

### Mandatory Spacing Usage Rules

Use ONLY predefined spacing constants. NO hardcoded spacing values allowed.

#### AppSpacing Constants Definition:
```dart
// lib/res/constants/spacing.dart
class AppSpacing {
  static const double spaceXXS = 2.0;   // 2px
  static const double spaceXS = 4.0;    // 4px
  static const double spaceS = 8.0;     // 8px
  static const double spaceM = 12.0;    // 12px
  static const double spaceL = 16.0;    // 16px
  static const double spaceXL = 24.0;   // 24px
  static const double spaceXXL = 32.0;  // 32px
  static const double spaceXXXL = 48.0; // 48px
}
```

#### Required Spacing Usage Patterns:
```dart
// CORRECT - EdgeInsets with AppSpacing
padding: EdgeInsets.all(AppSpacing.spaceL)
padding: EdgeInsets.symmetric(
  horizontal: AppSpacing.spaceL,
  vertical: AppSpacing.spaceM,
)
padding: EdgeInsets.only(
  left: AppSpacing.spaceM,
  right: AppSpacing.spaceM,
  top: AppSpacing.spaceS,
  bottom: AppSpacing.spaceXL,
)

// CORRECT - SizedBox with AppSpacing
SizedBox(height: AppSpacing.spaceM)
SizedBox(width: AppSpacing.spaceL)
SizedBox.square(dimension: AppSpacing.spaceXL)

// CORRECT - Container margin with AppSpacing
margin: EdgeInsets.all(AppSpacing.spaceM)
margin: EdgeInsets.symmetric(vertical: AppSpacing.spaceS)

// CORRECT - Gap with AppSpacing (in Flex widgets)
Gap(AppSpacing.spaceM)
Gap(AppSpacing.spaceL)
```

#### Forbidden Spacing Patterns:
```dart
// FORBIDDEN - Hardcoded spacing values
padding: EdgeInsets.all(16.0)
padding: EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0)
SizedBox(height: 24)
SizedBox(width: 16.0)
margin: EdgeInsets.only(top: 8.0, bottom: 16.0)

// FORBIDDEN - Magic numbers
Container(height: 48)
Container(width: 200)
Positioned(top: 10, left: 20)

// FORBIDDEN - Direct pixel values
height: 44.0
width: 320.0
borderRadius: BorderRadius.circular(8.0)
```

#### Spacing Compliance Verification:
ALL spacing MUST be from AppSpacing.* constants ONLY

---

## Dimension Management System Rules

### Mandatory Dimension Usage Rules

Use ONLY predefined dimension constants. NO hardcoded dimension values allowed anywhere.

#### AppDimensions Constants Definition:
```dart
// lib/res/constants/dimensions.dart
class AppDimensions {
  // Icon sizes
  static const double iconSizeXS = 16.0;     // 16px
  static const double iconSizeS = 20.0;      // 20px
  static const double iconSizeM = 24.0;      // 24px
  static const double iconSizeL = 32.0;      // 32px (DEFAULT)
  static const double iconSizeXL = 48.0;     // 48px
  static const double iconSizeXXL = 64.0;    // 64px

  // Font sizes
  static const double fontSizeXXS = 12.0;    // 12px
  static const double fontSizeXS = 14.0;     // 14px
  static const double fontSizeS = 16.0;      // 16px
  static const double fontSizeM = 22.0;      // 22px
  static const double fontSizeL = 24.0;      // 24px
  static const double fontSizeXL = 28.0;     // 28px
  static const double fontSizeXXL = 32.0;    // 32px

  // Line heights
  static const double lineHeightNormal = 1.3;    // 1.3
  static const double lineHeightMedium = 1.5;    // 1.5
  static const double lineHeightLarge = 1.7;     // 1.7

  // Letter spacing
  static const double letterSpacingNormal = 0.0;     // 0.0
  static const double letterSpacingMedium = 0.15;    // 0.15

  // Alpha values
  static const double alphaVeryLow = 0.05;      // 0.05
  static const double alphaLow = 0.1;           // 0.1
  static const double alphaMediumLow = 0.2;     // 0.2
  static const double alphaMedium = 0.3;        // 0.3
  static const double alphaMediumHigh = 0.38;   // 0.38
  static const double alphaHalf = 0.5;          // 0.5
  static const double alphaHigh = 0.8;          // 0.8

  // Container dimensions
  static const double containerHeightS = 40.0;     // 40px
  static const double containerHeightM = 60.0;     // 60px
  static const double containerHeightL = 80.0;     // 80px
  static const double containerHeightXL = 100.0;   // 100px
  static const double containerHeightXXL = 120.0;  // 120px

  static const double containerWidthS = 40.0;      // 40px
  static const double containerWidthM = 60.0;      // 60px
  static const double containerWidthL = 80.0;      // 80px
  static const double containerWidthXL = 100.0;    // 100px
  static const double containerWidthXXL = 120.0;   // 120px
  static const double containerWidthXXXL = 150.0;  // 150px

  // Border radius
  static const double radiusXS = 1.0;     // 1px
  static const double radiusS = 8.0;      // 8px
  static const double radiusM = 10.0;     // 10px
  static const double radiusL = 16.0;     // 16px

  // Border widths
  static const double borderWidthXS = 0.5;    // 0.5px
  static const double borderWidthS = 1.0;     // 1px
  static const double borderWidthM = 2.0;     // 2px

  // Button heights
  static const double buttonHeightS = 32.0;    // 32px
  static const double buttonHeightM = 44.0;    // 44px
  static const double buttonHeightL = 52.0;    // 52px

  // Decoration thickness
  static const double decorationThicknessS = 1.0;    // 1px
  static const double decorationThicknessM = 2.0;    // 2px
  static const double decorationThicknessL = 3.0;    // 3px

  // Max lines
  static const int maxLinesS = 1;      // 1 line
  static const int maxLinesM = 2;      // 2 lines
  static const int maxLinesL = 3;      // 3 lines
  static const int maxLinesXL = 5;     // 5 lines
  static const int maxLinesUnlimited = 999;  // Unlimited
}
```

#### Required Dimension Usage Patterns:
```dart
// CORRECT - Icon sizes with AppDimensions
IconButton(
  iconSize: AppDimensions.iconSizeL,  // 32px - LARGE default
  onPressed: _handleAction,
  icon: Icon(Icons.settings),
)

// CORRECT - Font sizes with AppDimensions
Text(
  l10n.title,
  style: theme.textTheme.headlineSmall?.copyWith(
    fontSize: AppDimensions.fontSizeL,  // 24px
    color: theme.colorScheme.onSurface,
  ),
)

// CORRECT - Line heights with AppDimensions
Text(
  l10n.description,
  style: theme.textTheme.bodyMedium?.copyWith(
    height: AppDimensions.lineHeightMedium,  // 1.5
    color: theme.colorScheme.onSurfaceVariant,
  ),
)

// CORRECT - Letter spacing with AppDimensions
Text(
  l10n.label,
  style: theme.textTheme.labelLarge?.copyWith(
    letterSpacing: AppDimensions.letterSpacingMedium,  // 0.15
    color: theme.colorScheme.primary,
  ),
)

// CORRECT - Alpha values with AppDimensions
Container(
  color: theme.colorScheme.primary.withOpacity(AppDimensions.alphaMedium),  // 0.3
  child: Text(l10n.overlayText),
)

// CORRECT - Container dimensions with AppDimensions
Container(
  width: AppDimensions.containerWidthL,    // 80px
  height: AppDimensions.containerHeightM,  // 60px
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(AppDimensions.radiusS),  // 8px
    border: Border.all(
      width: AppDimensions.borderWidthS,  // 1px
      color: theme.colorScheme.outline,
    ),
  ),
  child: Text(l10n.content),
)

// CORRECT - SizedBox with AppDimensions or AppSpacing
SizedBox(
  width: AppDimensions.containerWidthM,    // 60px
  height: AppSpacing.spaceL,               // 16px
  child: AppButton(
    size: AppButtonSize.large,
    child: Text(l10n.action),
  ),
)

// CORRECT - Decoration thickness with AppDimensions
Container(
  decoration: BoxDecoration(
    border: Border(
      bottom: BorderSide(
        width: AppDimensions.decorationThicknessM,  // 2px
        color: theme.colorScheme.outline,
      ),
    ),
  ),
  child: Text(l10n.underlinedText),
)

// CORRECT - Max lines with AppDimensions
Text(
  l10n.longDescription,
  style: theme.textTheme.bodyMedium,
  maxLines: AppDimensions.maxLinesL,  // 3 lines
  overflow: TextOverflow.ellipsis,
)
```

#### Forbidden Dimension Patterns:
```dart
// FORBIDDEN - Hardcoded icon sizes
IconButton(
  iconSize: 24.0,  // FORBIDDEN - use AppDimensions.iconSizeM
  onPressed: _handleAction,
  icon: Icon(Icons.settings),
)

// FORBIDDEN - Hardcoded font sizes
Text(
  l10n.title,
  style: TextStyle(fontSize: 18.0),  // FORBIDDEN - use AppDimensions.fontSizeM
)

// FORBIDDEN - Hardcoded line heights
Text(
  l10n.description,
  style: TextStyle(height: 1.4),  // FORBIDDEN - use AppDimensions.lineHeightMedium
)

// FORBIDDEN - Hardcoded letter spacing
Text(
  l10n.label,
  style: TextStyle(letterSpacing: 0.5),  // FORBIDDEN - use AppDimensions.letterSpacingMedium
)

// FORBIDDEN - Hardcoded alpha values
Container(
  color: theme.colorScheme.primary.withOpacity(0.3),  // FORBIDDEN - use AppDimensions.alphaMedium
  child: Text(l10n.overlayText),
)

// FORBIDDEN - Hardcoded container dimensions
Container(
  width: 100.0,   // FORBIDDEN - use AppDimensions.containerWidthXL
  height: 50.0,   // FORBIDDEN - use AppDimensions.containerHeightM
  child: Text(l10n.content),
)

// FORBIDDEN - Hardcoded border radius
Container(
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(12.0),  // FORBIDDEN - use AppDimensions.radiusM
  ),
  child: Text(l10n.content),
)

// FORBIDDEN - Hardcoded border widths
Container(
  decoration: BoxDecoration(
    border: Border.all(width: 1.5),  // FORBIDDEN - use AppDimensions.borderWidthS
  ),
  child: Text(l10n.content),
)

// FORBIDDEN - Hardcoded max lines
Text(
  l10n.longDescription,
  maxLines: 2,  // FORBIDDEN - use AppDimensions.maxLinesM
  overflow: TextOverflow.ellipsis,
)

// FORBIDDEN - Hardcoded decoration thickness
Container(
  decoration: BoxDecoration(
    border: Border(
      bottom: BorderSide(width: 2.0),  // FORBIDDEN - use AppDimensions.decorationThicknessM
    ),
  ),
  child: Text(l10n.underlinedText),
)
```

#### Dimension Compliance Verification:
ALL dimensions MUST be from AppDimensions.* or AppSpacing.* constants ONLY

#### Automated Dimension Violation Detection:
```bash
# THESE COMMANDS MUST RETURN ZERO RESULTS - MANDATORY
grep -r "iconSize: [0-9]" lib/
grep -r "fontSize: [0-9]" lib/
grep -r "height: [0-9]" lib/ | grep -v "AppDimensions\|AppSpacing"
grep -r "width: [0-9]" lib/ | grep -v "AppDimensions\|AppSpacing"
grep -r "letterSpacing: [0-9]" lib/
grep -r "lineHeight: [0-9]" lib/
grep -r "maxLines: [0-9]" lib/
grep -r "withOpacity([0-9]" lib/
grep -r "BorderRadius.circular([0-9]" lib/
grep -r "BorderSide(width: [0-9]" lib/
grep -r "decorationThickness: [0-9]" lib/
```

---

## Typography System Rules

### Mandatory Typography Usage Rules

Use ONLY theme text styles. NO hardcoded font sizes or weights allowed.

#### Required Typography Usage Patterns:
```dart
// CORRECT - Display styles
style: theme.textTheme.displayLarge
style: theme.textTheme.displayMedium
style: theme.textTheme.displaySmall

// CORRECT - Headline styles
style: theme.textTheme.headlineLarge
style: theme.textTheme.headlineMedium
style: theme.textTheme.headlineSmall

// CORRECT - Title styles
style: theme.textTheme.titleLarge
style: theme.textTheme.titleMedium
style: theme.textTheme.titleSmall

// CORRECT - Body styles
style: theme.textTheme.bodyLarge
style: theme.textTheme.bodyMedium
style: theme.textTheme.bodySmall

// CORRECT - Label styles
style: theme.textTheme.labelLarge
style: theme.textTheme.labelMedium
style: theme.textTheme.labelSmall

// CORRECT - Theme text styles with color modification
style: theme.textTheme.bodyLarge?.copyWith(
  color: theme.colorScheme.primary,
)
style: theme.textTheme.headlineSmall?.copyWith(
  color: theme.colorScheme.onSurface,
  fontWeight: FontWeight.w600,
)
```

#### Forbidden Typography Patterns:
```dart
// FORBIDDEN - Hardcoded TextStyle
style: TextStyle(fontSize: 16.0)
style: TextStyle(fontWeight: FontWeight.bold)
style: TextStyle(fontFamily: 'Inter')
style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.w600)

// FORBIDDEN - Italic text styles unless explicitly requested
style: TextStyle(fontStyle: FontStyle.italic)
style: theme.textTheme.bodyLarge?.copyWith(fontStyle: FontStyle.italic)
style: theme.textTheme.headlineSmall?.copyWith(
  fontStyle: FontStyle.italic,  // FORBIDDEN unless wireframe specifies
)

// FORBIDDEN - Direct font properties
fontSize: 16.0
fontWeight: FontWeight.bold
fontFamily: 'Inter'
letterSpacing: 0.5
fontStyle: FontStyle.italic  // FORBIDDEN unless explicitly requested

// FORBIDDEN - Hardcoded colors in TextStyle
style: TextStyle(color: Colors.black)
style: TextStyle(color: Color(0xFF000000))
style: TextStyle(color: AppColors.brand600)
```

#### Required Text Color Patterns:
```dart
// CORRECT - Text colors from theme
color: theme.colorScheme.onSurface       // Primary text
color: theme.colorScheme.onSurfaceVariant // Secondary text
color: theme.colorScheme.primary         // Accent text
color: theme.colorScheme.error           // Error text
color: theme.colorScheme.onPrimary       // Text on primary background
```

### Mandatory Typography Style Rules

NO ITALIC TEXT STYLES unless explicitly requested with "use italic" instruction.

#### Required Typography Style Patterns:
```dart
// CORRECT - Normal text styles only
style: theme.textTheme.bodyLarge?.copyWith(
  color: theme.colorScheme.onSurface,
  fontWeight: FontWeight.w400,  // Normal weight
)

// CORRECT - Bold text when needed
style: theme.textTheme.headlineSmall?.copyWith(
  color: theme.colorScheme.primary,
  fontWeight: FontWeight.w600,  // Bold weight
)

// CORRECT - Only when explicitly requested with "use italic"
style: theme.textTheme.bodyMedium?.copyWith(
  color: theme.colorScheme.onSurfaceVariant,
  fontStyle: FontStyle.italic,  // ONLY when user says "use italic"
)
```

#### Forbidden Italic Patterns - Automatic Rejection:
```dart
// FORBIDDEN - Italic without explicit instruction
Text(
  l10n.description,
  style: theme.textTheme.bodyLarge?.copyWith(
    fontStyle: FontStyle.italic,  // FORBIDDEN - no italic unless requested
  ),
)

// FORBIDDEN - Any italic styling without user instruction
style: TextStyle(fontStyle: FontStyle.italic)
fontStyle: FontStyle.italic
style: theme.textTheme.bodyMedium?.copyWith(fontStyle: FontStyle.italic)
```

#### Italic Usage Rules:
- **FORBIDDEN**: Using `fontStyle: FontStyle.italic` unless user explicitly says "use italic"
- **REQUIRED**: User must specifically request italic with phrases like:
  - "use italic for this text"
  - "make this text italic"
  - "apply italic style"
  - "style this in italics"
- **DEFAULT**: ALL text must use normal (non-italic) styling
- **WIREFRAME COMPLIANCE**: Follow wireframe specifications exactly - no italic unless shown

#### Typography Compliance Verification:
1. ALL text styles MUST be from theme.textTheme.* ONLY
2. NO italic styles UNLESS user explicitly requested with "use italic" instruction
3. ALL typography follows wireframe specifications exactly

---

## Localization System Rules

### Absolute Zero Tolerance for Hardcoded Strings

IMMEDIATE CODE REJECTION - ZERO EXCEPTIONS

#### Forbidden String Patterns - Instant Rejection:
```dart
// FORBIDDEN - ANY Text widget with string literals
Text('Hello')
Text("Welcome")
Text('$variable')
Text("${anything}")
Text('Hello $userName')
Text("You have $count items")

// FORBIDDEN - ANY widget property with string literals
AppBar(title: Text('Dashboard'))
SnackBar(content: Text('Success'))
AlertDialog(title: Text('Error'))
TextButton(child: Text('Submit'))
ElevatedButton(child: Text('Cancel'))
Tooltip(message: 'Help text')
TextField(hintText: 'Enter email')
TextField(labelText: 'Password')

// FORBIDDEN - ANY string constants for UI
const String buttonText = 'Submit';
const submitLabel = 'Submit Form';
final welcomeMessage = 'Welcome!';
String title = 'Dashboard';

// FORBIDDEN - ANY interpolated strings in UI
Text('Hello ${user.name}')
Text('Count: $itemCount')
Text('Welcome back, $userName!')
```

#### Required Localization Patterns - Mandatory:
```dart
// REQUIRED - ALL text from AppLocalizations
Text(l10n.hello)
Text(l10n.welcome)
Text(l10n.dashboard)
Text(l10n.submit)
Text(l10n.cancel)

// REQUIRED - Widget properties with localization
AppBar(title: Text(l10n.dashboard))
SnackBar(content: Text(l10n.success))
AlertDialog(title: Text(l10n.error))
TextButton(child: Text(l10n.submit))
ElevatedButton(child: Text(l10n.cancel))
Tooltip(message: l10n.helpText)
TextField(hintText: l10n.enterEmail)
TextField(labelText: l10n.password)

// REQUIRED - Parameterized strings
Text(l10n.welcomeUser(user.name))
Text(l10n.itemCount(count))
Text(l10n.lastLoginDate(DateFormat.yMd().format(date)))

// REQUIRED - Complex localized text
Text(l10n.termsAndConditions)
Text(l10n.privacyPolicyAgreement)
Text(l10n.passwordRequirements)
```

#### String Compliance Verification:
ALL strings MUST be from AppLocalizations.of(context) ONLY

#### Automated String Detection - Zero Tolerance:
```bash
# THESE COMMANDS MUST RETURN ZERO RESULTS - NO EXCEPTIONS
grep -r "Text('.*')" lib/
grep -r 'Text(".*")' lib/
grep -r "title: Text('.*')" lib/
grep -r "content: Text('.*')" lib/
grep -r "child: Text('.*')" lib/
grep -r "hintText: '.*'" lib/
grep -r "labelText: '.*'" lib/
grep -r "const String.*= '.*'" lib/
grep -r "final String.*= '.*'" lib/
```

---

## Asset System Rules

### Mandatory Asset Usage Rules

Use ONLY asset constants. NO direct asset paths allowed.

#### Required Asset Constants Structure:
```dart
// lib/res/constants/app_images.dart
class AppImages {
  // Logos
  static const String logoMain = 'assets/images/logos/app_logo.svg';
  static const String logoSmall = 'assets/images/logos/app_logo_small.png';
  static const String logoSplash = 'assets/images/logos/splash_logo.png';

  // Icons
  static const String iconHome = 'assets/images/icons/ic_home.svg';
  static const String iconProfile = 'assets/images/icons/ic_profile.svg';
  static const String iconSettings = 'assets/images/icons/ic_settings.svg';

  // Illustrations
  static const String illustrationWelcome = 'assets/images/illustrations/welcome.svg';
  static const String illustrationEmpty = 'assets/images/illustrations/empty_state.svg';

  // Backgrounds
  static const String backgroundLogin = 'assets/images/backgrounds/login_bg.jpg';
  static const String backgroundOnboarding = 'assets/images/backgrounds/onboarding_bg.png';
}

// lib/res/constants/app_icons.dart
class AppIcons {
  // Navigation icons
  static const String home = 'assets/images/icons/navigation/ic_home.svg';
  static const String search = 'assets/images/icons/navigation/ic_search.svg';
  static const String profile = 'assets/images/icons/navigation/ic_profile.svg';

  // Action icons
  static const String add = 'assets/images/icons/actions/ic_add.svg';
  static const String edit = 'assets/images/icons/actions/ic_edit.svg';
  static const String delete = 'assets/images/icons/actions/ic_delete.svg';

  // Status icons
  static const String success = 'assets/images/icons/status/ic_success.svg';
  static const String warning = 'assets/images/icons/status/ic_warning.svg';
  static const String error = 'assets/images/icons/status/ic_error.svg';
}
```

#### Required Asset Usage Patterns:
```dart
// CORRECT - Using asset constants
Image.asset(AppImages.logoMain)
Image.asset(AppImages.illustrationWelcome)
SvgPicture.asset(AppIcons.home)
SvgPicture.asset(AppIcons.success)

// CORRECT - Asset with properties
Image.asset(
  AppImages.logoMain,
  width: 120,
  height: 40,
  fit: BoxFit.contain,
)

// CORRECT - SVG with theme colors
SvgPicture.asset(
  AppIcons.home,
  width: 24,
  height: 24,
  colorFilter: ColorFilter.mode(
    theme.colorScheme.primary,
    BlendMode.srcIn,
  ),
)
```

#### Forbidden Asset Patterns:
```dart
// FORBIDDEN - Direct asset paths
Image.asset('assets/images/logos/app_logo.svg')
SvgPicture.asset('assets/images/icons/ic_home.svg')
AssetImage('assets/images/backgrounds/login_bg.jpg')

// FORBIDDEN - Hardcoded network images without caching
Image.network('https://example.com/image.jpg')
NetworkImage('https://example.com/image.jpg')

// FORBIDDEN - File paths in UI
Image.file(File('/path/to/image.jpg'))
FileImage(File('/path/to/image.jpg'))
```

#### Asset Compliance Verification:
ALL assets MUST use constants from AppImages.* or AppIcons.* ONLY

---

## Component System Rules

### Mandatory Component Usage Rules

Use ONLY common widgets from lib/ui/common/. NO custom widgets allowed.

#### Required Component Usage Patterns:

##### AppButton Usage:
```dart
// REQUIRED - Primary button
AppButton(
  onPressed: _handleSubmit,
  variant: AppButtonVariant.primary,
  size: AppButtonSize.large,
  isFullWidth: true,
  child: Text(l10n.submit),
)

// REQUIRED - Secondary button
AppButton(
  onPressed: _handleCancel,
  variant: AppButtonVariant.outlined,
  size: AppButtonSize.medium,
  child: Text(l10n.cancel),
)

// REQUIRED - Loading button
AppButton(
  onPressed: _handleAction,
  isLoading: _isLoading,
  variant: AppButtonVariant.primary,
  child: Text(l10n.processing),
)
```

##### AppTextInput Usage:
```dart
// REQUIRED - Text input
AppTextInput(
  label: l10n.emailAddress,
  controller: _emailController,
  keyboardType: TextInputType.emailAddress,
  focusNode: _emailFocusNode,
)

// REQUIRED - Password input
AppTextInput(
  label: l10n.password,
  controller: _passwordController,
  obscureText: true,
  focusNode: _passwordFocusNode,
)
```

##### CountryDropdown Usage:
```dart
// REQUIRED - Country selection
CountryDropdown(
  label: l10n.selectYourCountry,
  selectedCountry: _selectedCountry,
  onChanged: (country) => setState(() => _selectedCountry = country),
)
```

#### Forbidden Component Patterns:
```dart
// FORBIDDEN - Direct Material buttons
ElevatedButton(onPressed: () {}, child: Text('Submit'))
TextButton(onPressed: () {}, child: Text('Cancel'))
OutlinedButton(onPressed: () {}, child: Text('Action'))

// FORBIDDEN - Direct TextField
TextField(decoration: InputDecoration(labelText: 'Email'))
TextFormField(decoration: InputDecoration(hintText: 'Password'))

// FORBIDDEN - Custom dropdowns
DropdownButton<String>(items: [], onChanged: null)
DropdownButtonFormField<String>(items: [], onChanged: null)

// FORBIDDEN - Custom progress indicators
CircularProgressIndicator()
LinearProgressIndicator()

// FORBIDDEN - Screen-specific widgets
class LoginEmailField extends StatelessWidget {}
class ProfileAvatarWidget extends StatelessWidget {}
class DashboardCard extends StatelessWidget {}
```

#### Component Compliance Verification:
ALL UI components MUST be from lib/ui/common/ ONLY

---

## Strict Theme Compliance Rules

### Mandatory Theme Enforcement - Zero Tolerance

Theme system MUST be followed strictly with NO exceptions, NO overrides, NO custom styling.

#### Required Strict Theme Usage Patterns:
```dart
// CORRECT - ONLY theme colors allowed
Container(
  color: theme.colorScheme.surface,           // ONLY from theme
  child: Text(
    l10n.title,
    style: theme.textTheme.headlineSmall,     // ONLY from theme
  ),
)

// CORRECT - Theme colors with proper contrast
Card(
  color: theme.colorScheme.surfaceVariant,    // ONLY from theme
  child: Text(
    l10n.content,
    style: theme.textTheme.bodyMedium?.copyWith(
      color: theme.colorScheme.onSurfaceVariant, // ONLY from theme
    ),
  ),
)

// CORRECT - All styling from theme system
AppBar(
  backgroundColor: theme.colorScheme.surface,  // ONLY from theme
  foregroundColor: theme.colorScheme.onSurface, // ONLY from theme
  elevation: 0,                               // Allowed system property
  title: Text(
    l10n.appTitle,
    style: theme.textTheme.titleLarge,        // ONLY from theme
  ),
)

// CORRECT - Buttons with theme colors only
ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: theme.colorScheme.primary,    // ONLY from theme
    foregroundColor: theme.colorScheme.onPrimary,  // ONLY from theme
    textStyle: theme.textTheme.labelLarge,         // ONLY from theme
  ),
  onPressed: _handleAction,
  child: Text(l10n.submit),
)
```

#### Forbidden Theme Violations - Immediate Rejection:
```dart
// FORBIDDEN - ANY custom colors
Container(color: Colors.red)                    // FORBIDDEN
Container(color: Color(0xFFFF0000))            // FORBIDDEN
Container(color: Color.fromRGBO(255, 0, 0, 1)) // FORBIDDEN

// FORBIDDEN - ANY custom text styles
Text(
  l10n.title,
  style: TextStyle(                            // FORBIDDEN
    fontSize: 24.0,
    fontWeight: FontWeight.bold,
    color: Colors.black,
  ),
)

// FORBIDDEN - ANY theme overrides
Container(
  decoration: BoxDecoration(
    color: theme.colorScheme.primary.withOpacity(0.5), // FORBIDDEN - opacity override
    borderRadius: BorderRadius.circular(12.0),         // FORBIDDEN - custom radius
  ),
)

// FORBIDDEN - ANY custom styling
AppBar(
  backgroundColor: Colors.blue,                // FORBIDDEN
  title: Text(
    l10n.title,
    style: TextStyle(                          // FORBIDDEN
      color: Colors.white,
      fontSize: 20.0,
    ),
  ),
)

// FORBIDDEN - ANY styling modifications
style: theme.textTheme.bodyLarge?.copyWith(
  fontSize: 18.0,                             // FORBIDDEN - size override
  letterSpacing: 1.2,                         // FORBIDDEN - spacing override
  height: 1.5,                                // FORBIDDEN - height override
)
```

### Mandatory Theme System Structure

#### Colors - ONLY from theme.colorScheme:
```dart
// REQUIRED - Primary colors
theme.colorScheme.primary
theme.colorScheme.onPrimary
theme.colorScheme.primaryContainer
theme.colorScheme.onPrimaryContainer

// REQUIRED - Secondary colors
theme.colorScheme.secondary
theme.colorScheme.onSecondary
theme.colorScheme.secondaryContainer
theme.colorScheme.onSecondaryContainer

// REQUIRED - Surface colors
theme.colorScheme.surface
theme.colorScheme.onSurface
theme.colorScheme.surfaceVariant
theme.colorScheme.onSurfaceVariant
theme.colorScheme.surfaceContainerHighest

// REQUIRED - Error colors
theme.colorScheme.error
theme.colorScheme.onError
theme.colorScheme.errorContainer
theme.colorScheme.onErrorContainer

// REQUIRED - Success colors (via extension)
theme.colorScheme.success
theme.colorScheme.onSuccess
theme.colorScheme.successContainer
theme.colorScheme.onSuccessContainer

// REQUIRED - Outline colors
theme.colorScheme.outline
theme.colorScheme.outlineVariant
theme.colorScheme.shadow
theme.colorScheme.scrim
```

#### Typography - ONLY from theme.textTheme:
```dart
// REQUIRED - Display styles
theme.textTheme.displayLarge
theme.textTheme.displayMedium
theme.textTheme.displaySmall

// REQUIRED - Headline styles
theme.textTheme.headlineLarge
theme.textTheme.headlineMedium
theme.textTheme.headlineSmall

// REQUIRED - Title styles
theme.textTheme.titleLarge
theme.textTheme.titleMedium
theme.textTheme.titleSmall

// REQUIRED - Body styles
theme.textTheme.bodyLarge
theme.textTheme.bodyMedium
theme.textTheme.bodySmall

// REQUIRED - Label styles
theme.textTheme.labelLarge
theme.textTheme.labelMedium
theme.textTheme.labelSmall
```

### Theme Modification Rules

#### Allowed Theme Modifications (ONLY these):
```dart
// ALLOWED - Color changes ONLY
style: theme.textTheme.bodyLarge?.copyWith(
  color: theme.colorScheme.primary,           // ONLY color from theme
)

// ALLOWED - FontWeight changes ONLY (standard weights)
style: theme.textTheme.headlineSmall?.copyWith(
  color: theme.colorScheme.onSurface,
  fontWeight: FontWeight.w400,               // ONLY standard weights
  fontWeight: FontWeight.w500,
  fontWeight: FontWeight.w600,
  fontWeight: FontWeight.w700,
)

// ALLOWED - Italic ONLY when explicitly requested
style: theme.textTheme.bodyMedium?.copyWith(
  color: theme.colorScheme.onSurfaceVariant,
  fontStyle: FontStyle.italic,               // ONLY when user says "use italic"
)
```

#### Forbidden Theme Modifications:
```dart
// FORBIDDEN - Size modifications
style: theme.textTheme.bodyLarge?.copyWith(
  fontSize: 18.0,                            // FORBIDDEN
)

// FORBIDDEN - Spacing modifications
style: theme.textTheme.bodyLarge?.copyWith(
  letterSpacing: 0.5,                        // FORBIDDEN
  height: 1.5,                               // FORBIDDEN
)

// FORBIDDEN - Font family modifications
style: theme.textTheme.bodyLarge?.copyWith(
  fontFamily: 'CustomFont',                  // FORBIDDEN
)

// FORBIDDEN - Color opacity modifications
Container(
  color: theme.colorScheme.primary.withOpacity(0.5), // FORBIDDEN
)

// FORBIDDEN - Color manipulation
Container(
  color: theme.colorScheme.primary.withAlpha(128),   // FORBIDDEN
)
```

### Strict Theme Compliance Verification

MUST VERIFY:
1. ALL colors come from theme.colorScheme.* ONLY
2. ALL text styles come from theme.textTheme.* ONLY
3. NO custom colors anywhere (hardcoded, calculated, or modified)
4. NO custom text styles anywhere (hardcoded or with custom properties)
5. NO theme color modifications (opacity, alpha, etc.)
6. NO theme text modifications (fontSize, letterSpacing, height, fontFamily)
7. ONLY allowed modifications: color (from theme), fontWeight (standard), fontStyle (when requested)
8. ALL components automatically adapt to light/dark themes
9. ALL styling follows theme system without exceptions

---

## Theming System Rules

### Mandatory Theming Rules

ALL components MUST support light/dark themes.

#### Required Theming Patterns:
```dart
// CORRECT - Theme-aware colors
Container(
  color: theme.colorScheme.surface,
  child: Text(
    l10n.title,
    style: theme.textTheme.headlineSmall?.copyWith(
      color: theme.colorScheme.onSurface,
    ),
  ),
)

// CORRECT - Theme-aware styling
Card(
  color: theme.colorScheme.surfaceVariant,
  elevation: 2,
  child: Padding(
    padding: EdgeInsets.all(AppSpacing.spaceL),
    child: Column(
  children: [
        Icon(
          Icons.info,
          color: theme.colorScheme.primary,
          size: 24,
        ),
        SizedBox(height: AppSpacing.spaceM),
        Text(
          l10n.information,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    ),
  ),
)
```

#### Forbidden Theming Patterns:
```dart
// FORBIDDEN - Fixed colors that don't adapt to theme
Container(color: Colors.white)
Container(color: Color(0xFFFFFFFF))
Text('Title', style: TextStyle(color: Colors.black))
Icon(Icons.home, color: Colors.blue)

// FORBIDDEN - Non-adaptive styling
Card(color: Colors.grey[100])
AppBar(backgroundColor: Colors.purple)
```

#### Theming Compliance Verification:
ALL components MUST adapt to light/dark themes

---

## Accessibility System Rules

### Mandatory Accessibility Rules

ALL components MUST have semantic labels and accessibility support.

#### Required Accessibility Patterns:
```dart
// CORRECT - Semantic labels for buttons
AppButton(
  onPressed: _handleSubmit,
  child: Text(l10n.submit),
  semanticsLabel: l10n.submitButtonSemantic,
)

// CORRECT - Semantic labels for icons
IconButton(
  icon: Icon(Icons.settings),
  onPressed: _openSettings,
  tooltip: l10n.settings,
  semanticsLabel: l10n.openSettingsSemantic,
)

// CORRECT - Semantic labels for images
Image.asset(
  AppImages.logoMain,
  semanticLabel: l10n.appLogoSemantic,
)

// CORRECT - Semantic labels for text fields
AppTextInput(
  label: l10n.emailAddress,
  controller: _emailController,
  semanticsLabel: l10n.emailInputSemantic,
)

// CORRECT - Focus management
Focus(
  child: AppTextInput(
    label: l10n.password,
    controller: _passwordController,
    focusNode: _passwordFocusNode,
  ),
)
```

#### Forbidden Accessibility Patterns:
```dart
// FORBIDDEN - Missing semantic labels
IconButton(icon: Icon(Icons.settings), onPressed: _openSettings)
Image.asset(AppImages.logoMain)
GestureDetector(onTap: _handleTap, child: Container())

// FORBIDDEN - Non-accessible touch targets (< 48dp)
GestureDetector(
  onTap: _handleTap,
  child: Container(width: 24, height: 24),
)

// FORBIDDEN - Missing tooltips
IconButton(icon: Icon(Icons.help), onPressed: _showHelp)
```

#### Accessibility Compliance Verification:
ALL interactive elements MUST have semantic labels

---

## Design System Compliance Verification

### Automatic Compliance Checks

Automatically verify before any response:

1. **Color Compliance**: ALL colors from theme.colorScheme.* ONLY
2. **Spacing Compliance**: ALL spacing from AppSpacing.* constants ONLY
3. **Typography Compliance**: ALL text styles from theme.textTheme.* ONLY
4. **String Compliance**: ALL strings from AppLocalizations.of(context) ONLY
5. **Asset Compliance**: ALL assets through defined constants ONLY
6. **Component Compliance**: ALL components from lib/ui/common/ ONLY
7. **Theming Compliance**: ALL components support light/dark themes
8. **Accessibility Compliance**: ALL components have semantic labels

### Automatic Rejection Triggers

ANY of these patterns will result in IMMEDIATE REJECTION:

- Color(0xFF...) or Colors.* anywhere
- EdgeInsets.all(16.0) or hardcoded spacing values
- TextStyle(fontSize: 16.0) or hardcoded typography
- Text('Hello') or any hardcoded strings
- 'assets/images/logo.png' or direct asset paths
- ElevatedButton() or direct Material widgets
- Missing semantic labels or accessibility support
- Non-theme-aware colors or styling
- Hardcoded dimensions: iconSize: 24.0, width: 100.0, height: 50.0
- Hardcoded font properties: fontSize: 18.0, letterSpacing: 0.5, lineHeight: 1.4
- Hardcoded alpha values: withOpacity(0.3), withAlpha(128)
- Hardcoded container properties: borderRadius: 12.0, border width: 1.5
- Hardcoded text properties: maxLines: 2, decorationThickness: 2.0

### Automated Violation Detection

```bash
# THESE COMMANDS MUST RETURN ZERO RESULTS - MANDATORY
grep -r "Color(0x" lib/
grep -r "Colors\." lib/
grep -r "EdgeInsets\.all([0-9]" lib/
grep -r "SizedBox(height: [0-9]" lib/
grep -r "TextStyle(" lib/ | grep "fontSize:"
grep -r "Text('.*')" lib/
grep -r 'Text(".*")' lib/
grep -r "assets/" lib/ui/
grep -r "ElevatedButton(" lib/
grep -r "TextButton(" lib/
grep -r "TextField(" lib/
grep -r "iconSize: [0-9]" lib/
grep -r "fontSize: [0-9]" lib/
grep -r "height: [0-9]" lib/ | grep -v "AppDimensions\|AppSpacing"
grep -r "width: [0-9]" lib/ | grep -v "AppDimensions\|AppSpacing"
grep -r "letterSpacing: [0-9]" lib/
grep -r "lineHeight: [0-9]" lib/
grep -r "maxLines: [0-9]" lib/
grep -r "withOpacity([0-9]" lib/
grep -r "BorderRadius.circular([0-9]" lib/
grep -r "BorderSide(width: [0-9]" lib/
grep -r "decorationThickness: [0-9]" lib/
```

---

## Automatic Enforcement Summary

These design system rules MUST be automatically enforced in every single interaction:

### Immediate Enforcement Requirements

1. **ZERO Hardcoded Values**: NO hardcoded colors, spacing, typography, strings, assets, or dimensions
2. **ONLY Theme Usage**: ALL colors from theme.colorScheme.* ONLY
3. **ONLY Spacing Constants**: ALL spacing from AppSpacing.* ONLY - ONLY spaceM (12px) or spaceL (16px)
4. **ONLY Theme Typography**: ALL text styles from theme.textTheme.* ONLY and NO italic unless explicitly requested
5. **ONLY Localized Strings**: ALL strings from AppLocalizations.of(context) ONLY
6. **ONLY Asset Constants**: ALL assets through AppImages.* or AppIcons.* ONLY
7. **ONLY Common Components**: ALL UI from lib/ui/common/ ONLY
8. **Mandatory Large Sizing**: ALL components MUST use LARGE as default size (AppButtonSize.large, AppTextInputSize.large, iconSize: 32.0)
9. **Mandatory Consistent Spacing**: ALL widgets MUST use AppSpacing.spaceM (12px) between elements, AppSpacing.spaceL (16px) for padding/sections
10. **Mandatory Theming**: ALL components MUST support light/dark themes
11. **Mandatory Accessibility**: ALL components MUST have semantic labels
12. **Mandatory Strict Theme Compliance**: ALL styling MUST come from theme system ONLY - NO custom styling, NO overrides, NO modifications
13. **Mandatory Dimension Constants**: ALL UI properties (width, height, fontSize, letterSpacing, lineHeight, decorationThickness, maxLines, alpha) MUST use AppDimensions.* constants ONLY
14. **ZERO Tolerance**: ANY violation results in IMMEDIATE REJECTION

### Enforcement Verification

Before ANY response, verify:
- All colors use theme.colorScheme.*
- All spacing uses AppSpacing.spaceM (12px) or AppSpacing.spaceL (16px) ONLY
- All typography uses theme.textTheme.* and NO italic unless explicitly requested
- All strings use AppLocalizations.of(context)
- All assets use defined constants
- All components are from lib/ui/common/
- All components use LARGE as default size (AppButtonSize.large, AppTextInputSize.large, iconSize: 32.0)
- All widget spacing follows spaceM (between elements) / spaceL (padding/sections) pattern
- All components support theming
- All components have accessibility
- Strict theme compliance - NO custom styling, NO theme modifications, NO overrides
- All dimensions use AppDimensions.* constants (width, height, fontSize, letterSpacing, lineHeight, decorationThickness, maxLines, alpha)
- All SizedBox dimensions use AppDimensions.* or AppSpacing.* constants
- All Container dimensions use AppDimensions.* constants
- NO hardcoded numeric values for any UI properties

IF ANY CHECK FAILS, REJECT AND EXPLAIN THE SPECIFIC VIOLATION.

---

REMEMBER: These design system rules are NOT optional. They are MANDATORY and will cause immediate code rejection if violated. ALL code MUST comply with these rules. ZERO EXCEPTIONS.

---

These design system rules ensure visual consistency, maintainability, and professional UI/UX quality across the entire Flutter application with automatic enforcement in every interaction.

---

## Strict Compliance Enforcement - Zero Tolerance

Automatic enforcement for every single code interaction.

## Immediate Rejection Patterns

### MVVM Violations - Instant Rejection:
```dart
// FORBIDDEN: setState in UI
class BadScreen extends StatefulWidget {
  void _handleAction() {
    setState(() {}); // INSTANT REJECTION
  }
}

// FORBIDDEN: Business logic in UI
class BadScreen extends StatelessWidget {
  void _handleSubmit() async {
    if (email.contains('@')) { // BUSINESS LOGIC IN UI - FORBIDDEN
      await ApiClient().post('/submit');
    }
  }
}

// FORBIDDEN: BuildContext in Provider
class BadProvider extends ChangeNotifier {
  void submit(BuildContext context) { // FORBIDDEN PARAMETER
    Navigator.of(context).push(...);
  }
}
```

### Localization Violations - Instant Rejection:
```dart
// FORBIDDEN: ANY hardcoded strings
Text('Hello World') // INSTANT REJECTION
AppBar(title: Text('Dashboard')) // INSTANT REJECTION
const String label = 'Submit'; // INSTANT REJECTION
hintText: 'Enter email' // INSTANT REJECTION
```

### Dimension Violations - Instant Rejection:
```dart
// FORBIDDEN: ANY hardcoded values
EdgeInsets.all(16.0) // INSTANT REJECTION
SizedBox(height: 20) // INSTANT REJECTION
padding: EdgeInsets.symmetric(horizontal: 12.0) // INSTANT REJECTION
Container(width: 200, height: 100) // INSTANT REJECTION
```

### Exception Handling Violations - Instant Rejection:
```dart
// FORBIDDEN: Generic catch
try {
  await operation();
} catch (e) { // INSTANT REJECTION - must use 'on'
  print(e);
}

// FORBIDDEN: Catching Object/dynamic
catch (Object e) // INSTANT REJECTION
catch (dynamic e) // INSTANT REJECTION
```

### Analysis Options Violations - Instant Rejection:
```dart
// FORBIDDEN: Non-final fields when final is possible
class BadClass {
  String _name = ''; // Should be final if not changed
  List<String> _items = []; // Should be final
}

// FORBIDDEN: Non-const constructors when const is possible
class BadWidget extends StatelessWidget {
  BadWidget({Key? key}); // Should be const
}
```

## Required Patterns - Mandatory

### MVVM Architecture:
```dart
// REQUIRED: View Layer
class ExampleScreen extends StatelessWidget {
  const ExampleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return Consumer<ExampleProvider>(
      builder: (context, provider, child) {
        return Scaffold(
          body: Padding(
            padding: EdgeInsets.all(AppSpacing.spaceL),
            child: AppButton(
              onPressed: () => _handleAction(context, provider, l10n),
              size: AppButtonSize.large,
              child: Text(l10n.submitButton),
            ),
          ),
        );
      },
    );
  }

  Future<void> _handleAction(
    BuildContext context,
    ExampleProvider provider,
    AppLocalizations l10n,
  ) async {
    try {
      final success = await provider.performAction();
      if (success && context.mounted) {
        AppSnackBar.showSuccess(context, message: l10n.actionSuccess);
      }
    } on ValidationException catch (e) {
      AppSnackBar.showError(context, message: e.message);
    } on NetworkException catch (e) {
      AppSnackBar.showError(context, message: l10n.networkError);
    } on Exception catch (e) {
      AppSnackBar.showError(context, message: l10n.unexpectedError);
    }
  }
}

// REQUIRED: ViewModel Layer
class ExampleProvider extends ChangeNotifier {
  final ExampleService _service;

  // REQUIRED: Final fields where possible
  final List<String> _items = [];
  bool _isLoading = false;

  ExampleProvider({required ExampleService service}) : _service = service;

  List<String> get items => List.unmodifiable(_items);
  bool get isLoading => _isLoading;

  Future<bool> performAction() async {
    _setLoading(true);

    try {
      final result = await _service.performAction();
      _setLoading(false);
      return result.success;
    } on ApiException catch (e) {
      _setLoading(false);
      rethrow; // Let UI handle specific error
    } on Exception catch (e) {
      _setLoading(false);
      rethrow;
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
}

// REQUIRED: Model Layer
class ExampleService {
  final ApiClient _apiClient;

  const ExampleService({required ApiClient apiClient}) : _apiClient = apiClient;

  Future<ServiceResult> performAction() async {
    try {
      final response = await _apiClient.post('/action');
      return ServiceResult.success(response.data);
    } on DioException catch (e) {
      throw ApiException('API Error: ${e.message}', statusCode: e.response?.statusCode ?? 0);
    } on Exception catch (e) {
      throw ServiceException('Service error: ${e.toString()}');
    }
  }
}
```

### Localization:
```dart
// REQUIRED: All text from AppLocalizations
Text(l10n.welcomeMessage)
AppBar(title: Text(l10n.dashboardTitle))
hintText: l10n.enterEmailHint
AppButton(child: Text(l10n.submitButton))

// REQUIRED: Parameterized strings
Text(l10n.welcomeUser(userName))
Text(l10n.itemCount(items.length))
```

### Dimensions:
```dart
// REQUIRED: All dimensions from constants
padding: EdgeInsets.all(AppSpacing.spaceL)
SizedBox(height: AppSpacing.spaceM)
AppButton(size: AppButtonSize.large)
AppTextInput(size: AppTextInputSize.large)
IconButton(iconSize: AppDimensions.iconSizeLarge)
```

### Exception Handling:
```dart
// REQUIRED: Specific exception handling with 'on'
try {
  await riskyOperation();
} on ValidationException catch (e) {
  _handleValidationError(e);
} on NetworkException catch (e) {
  _handleNetworkError(e);
} on ApiException catch (e) {
  _handleApiError(e);
} on Exception catch (e) {
  _handleUnexpectedError(e);
}
```

### Analysis Options Compliance:
```dart
// REQUIRED: Final fields where possible
class GoodClass {
  final String _name = 'initial'; // final when not changed
  final List<String> _items = []; // final collection
  String _mutableField = ''; // non-final when changed
}

// REQUIRED: Const constructors
class GoodWidget extends StatelessWidget {
  const GoodWidget({super.key}); // const constructor

  @override
  Widget build(BuildContext context) {
    return const Text('Hello'); // const where possible
  }
}
```

## Enforcement Checklist

Before EVERY code response, verify ALL 40 points:

1-7: MVVM Architecture
8-13: Localization
14-19: Dimensions
20-26: Analysis Options
27-32: Exception Handling
33-40: Architecture Foundations

If ANY check fails -> IMMEDIATE REJECTION with explanation

## Auto-Rejection Commands

```bash
# These patterns trigger INSTANT REJECTION:
grep -r "Text('.*')" lib/ui/ # Hardcoded strings
grep -r "EdgeInsets\.all([0-9]" lib/ # Hardcoded dimensions
grep -r "} catch (e)" lib/ # Generic catch
grep -r "setState(" lib/ # setState usage
grep -r "StatefulWidget" lib/ # StatefulWidget for business logic
```

ZERO TOLERANCE: Any violation = IMMEDIATE REJECTION + EXPLANATION + CORRECT PATTERN
